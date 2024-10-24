import styles from '../styles/MyRequests.module.css';
import React, { useState, useEffect } from 'react';
import 'normalize.css';
import { faXmark, faTrashCan, faCheck, faCircleCheck, faCircleXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyRequests = ({ studentId }) => {
    const [requests, setRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [showAppliedTutorsModal, setShowAppliedTutorsModal] = useState(false);
    const [appliedTutors, setAppliedTutors] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [requestToDelete, setRequestToDelete] = useState(null);
    const [sortingOrder, setSortingOrder] = useState('latest');

    useEffect(() => {
        fetchRequests();
    }, [sortingOrder]);

    const fetchRequests = async () => {
        try {
            const response = await fetch(`/api/getRequestsStudent?studentId=${studentId}`);
            const data = await response.json();
            let sortedOffers = data;

            if (sortingOrder === 'oldest') {
                sortedOffers = sortedOffers.sort((a, b) => new Date(a.TIMESTAMP) - new Date(b.TIMESTAMP));
            } else if (sortingOrder === 'latest') {
                sortedOffers = sortedOffers.sort((a, b) => new Date(b.TIMESTAMP) - new Date(a.TIMESTAMP));
            }

            setRequests(sortedOffers);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleAppliedTutorsClick = async (requestId) => {
        try {
            const response = await fetch(`/api/getAppliedTutors?requestId=${requestId}`);
            const data = await response.json();
            setAppliedTutors(data);
            setShowAppliedTutorsModal(true);
        } catch (error) {
            console.error('Error fetching applied tutors:', error);
        }
    };
    const handleDeleteRequest = (requestId) => {
        setRequestToDelete(requestId);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`/api/deleteRequest?requestId=${requestToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchRequests();
            } else {
                console.error('Error deleting request:', response.status);
            }
        } catch (error) {
            console.error('Error deleting request:', error);
        }
        setShowDeleteConfirmation(false);
        setRequestToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setRequestToDelete(null);
    };

    const handleSelectTutor = async (tutorId, postId) => {
        try {
            const response = await fetch('/api/selectTutor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tutorId,
                    postId,
                    studentId,
                }),
            });

            if (response.ok) {
                setShowAppliedTutorsModal(false);
                fetchRequests();// Refresh requests after selecting tutor
            } else {
                console.error('Error selecting tutor:', response.status);
            }
        } catch (error) {
            console.error('Error selecting tutor:', error);
        }
    };
    const handleRejectTutor = async (tutorId, postId) => {
        try {
            const response = await fetch('/api/rejectTutor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tutorId,
                    postId,
                }),
            });

            if (response.ok) {
                // Handle successful rejection
                fetchRequests();
                handleAppliedTutorsClick(postId); // Refresh requests after rejection
            } else {
                console.error('Error rejecting tutor:', response.status);
            }
        } catch (error) {
            console.error('Error rejecting tutor:', error);
        }
    };
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Modify the format as needed
    };
    const handleSortingChange = (event) => {
        setSortingOrder(event.target.value);
        fetchRequests();
    };

    return (

        <div className={styles.container}>

            <div className={styles.wrapper}>

                <h2>My Requests</h2>

                <div className={styles.sortcontainer}>
                    <label>Sort by:</label>
                    <select value={sortingOrder} onChange={handleSortingChange}>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>

                <div className={styles.cardwrapper} >

                    {requests.length === 0 ? (

                        
                        <div className={styles.noreqcontainer}>
                        <FontAwesomeIcon className={styles.erroricon} icon={faCircleExclamation} />
                        <p className={styles.nothingmsg}> No requests yet</p>
                    </div>


                    ) : (

                        requests.map((request) => (

                            <div key={request.POST_ID} className={styles.requestcard}>

                                <div className={styles.requestdetails}>

                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Subjects :</p>
                                        <p className={styles.fieldvalue}>  {request.SUBJECTS} </p>
                                    </div>

                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Tuition Type :</p>
                                        <p className={styles.fieldvalue}> {request.TUITION_TYPE} </p>
                                    </div>

                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Days per Week :</p>
                                        <p className={styles.fieldvalue}> {request.DAYS_PER_WEEK} </p>
                                    </div>

                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Salary :</p>
                                        <p className={styles.fieldvalue}> {request.SALARY} </p>
                                    </div>

                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Tutor Gender :</p>
                                        <p className={styles.fieldvalue}> {request.TUTOR_GENDER} </p>
                                    </div>





                                    {/* <p>Subjects: {request.SUBJECTS}</p>

                                    <p>Tuition Type: {request.TUITION_TYPE}</p>

                                    <p>Days per Week: {request.DAYS_PER_WEEK}</p>

                                    <p>Salary: {request.SALARY}</p>
                                    <p>Tutor Gender: {request.TUTOR_GENDER}</p> */}



                                    {request.NOTE === null ? (


                                        <div className={styles.fieldcontainer}>
                                            <p className={styles.fieldname}> Note :</p>
                                            <p className={styles.fieldvalue}> No note </p>
                                        </div>


                                    ) : (

                                        <div className={styles.fieldcontainer}>
                                            <p className={styles.fieldname}> Note :</p>
                                            <p className={styles.fieldvalue}> {request.NOTE} </p>
                                        </div>

                                    )}


                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Time Posted :</p>
                                        <p className={styles.fieldvalue}> {formatTimestamp(request.TIMESTAMP)} </p>
                                    </div>

                                </div>



                                <div className={styles.btncontainer}>

                                    <button className={styles.appliedbtn} onClick={() => handleAppliedTutorsClick(request.POST_ID)}>Applied Tutors</button>
                                    <button className={styles.deletebtn} onClick={() => handleDeleteRequest(request.POST_ID)}>Delete Post</button>


                                </div>
                            </div>
                        ))
                    )}

                </div>


                {showDeleteConfirmation && (
                    <div className={styles.confirmationmodal}>
                        <p>Are you sure you want to delete this post?</p>
                        <div className={styles.confirmbtns}>
                            <button className={styles.yes}  onClick={handleConfirmDelete}>Yes</button>
                            <button className={styles.no} onClick={handleCancelDelete}>No</button>
                        </div>
                    </div>
                )}

                {showAppliedTutorsModal && (
                    <div className={styles.appliedtutorsmodal}>

                        <div className={styles.appliedtutorscontainer}>

                            <h2>Applied Tutors</h2>

                            {appliedTutors.length === 0 ? (


                                <div className={styles.nothingmsgcontainer}>
                                    <FontAwesomeIcon className={styles.erroricon} icon={faCircleExclamation} />
                                    <p className={styles.nothingmsg}>No applied tutors</p>
                                </div>



                            ) : (

                                appliedTutors.map((tutor) => (
                                    <div key={tutor.TUTOR_ID} className={styles.tutoritem}>

                                        <div className={styles.appliedtutorsimgcontainer}>

                                            <img src={tutor.IMAGE} alt={tutor.NAME} />

                                        </div>

                                        <p>{tutor.NAME}</p>

                                        <div className={styles.tutormodalbtncontainer}>
                                            <button className={styles.selectbtn} onClick={() => handleSelectTutor(tutor.TUTOR_ID, tutor.POST_ID)}><FontAwesomeIcon icon={faCircleCheck} /></button>
                                            <button className={styles.rejectbtn} onClick={() => handleRejectTutor(tutor.TUTOR_ID, tutor.POST_ID)}><FontAwesomeIcon icon={faCircleXmark} /></button>
                                        </div>
                                    </div>
                                )))}
                            <button className={styles.closebtn} onClick={() => setShowAppliedTutorsModal(false)}><FontAwesomeIcon icon={faXmark} /></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyRequests;
