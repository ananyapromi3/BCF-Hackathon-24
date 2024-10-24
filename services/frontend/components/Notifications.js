// Notifications.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/Notifications.module.css';
import MyTutorContainer from './MyTutorContainer';
import MyRequests from './MyRequests';
import 'normalize.css';
import { faXmark, faTrashCan, faArrowLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notifications = ({ studentId }) => {
    const [notifications, setNotifications] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState(null);

    useEffect(() => {
        fetchNotifications();
        setSelectedComponent(null);
        const interval = setInterval(fetchNotifications, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(`/api/getNotifications?userId=${studentId}`);
            const data = await response.json();
            const currentTime = new Date();
            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(currentTime.getDate() - 14);

            const filteredNotifications = data.filter((notification) => {
                const notificationTime = new Date(notification.CREATED_AT);
                return notificationTime >= twoWeeksAgo && notificationTime <= currentTime;
            });

            setNotifications(filteredNotifications)
            //setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Modify the format as needed
    };
    const handleNotificationClick = (notification) => {
        // Determine which component to display based on the notification
        if (notification) {
            setSelectedComponent(<MyTutorContainer studentId={studentId} />);
        } //else if (notification.type === 'MyTutorContainer') {
        //setSelectedComponent(<MyTutorContainer studentId={studentId}/>);
        // }

        // Mark the notification as read (you need to implement this part)
        //markNotificationAsRead(notification.NOTIFICATION_ID);
    };


    return (
        <div className={styles.container} >
            <div className={styles.separator} >


                {selectedComponent ? (
                    <div>{selectedComponent}</div>
                ) : (

                    <div className={styles.wrapper}>
                        <h2>Notifications</h2>

                        <div className={styles.notificationWrapper}>
                            {notifications.map((notification) => (
                                <div

                                    key={notification.NOTIFICATION_ID}
                                    className={`${styles.notificationitem} ${notification.IS_READ === 'No' ? styles.unread : styles.read
                                        }`}
                                    
                                >
                                   
                                   <div className={styles.notificationinfo}>
                                    <p className={styles.notimsg}>{notification.MESSAGE}</p>
                                    <p className={styles.notitime}>{formatTimestamp(notification.CREATED_AT)}</p>
                                    </div>

                                    <FontAwesomeIcon  className={styles.noticon} icon={faCircle}></FontAwesomeIcon>

                                </div>
                            ))}

                        </div>
                    </div>

                )}
            </div>
        </div>


    );

};

export default Notifications;
