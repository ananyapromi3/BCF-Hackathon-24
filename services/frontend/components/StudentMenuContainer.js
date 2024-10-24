import 'normalize.css';
 import Link from 'next/link';
import React, { useState } from 'react';
import styles from "../styles/Menu.module.css";
import { useRouter } from 'next/router';
import { faSliders, faCamera, faHouse , faUser , faPersonChalkboard , faUsersLine , faPeopleGroup , faEnvelope , faBell, faCirclePlay, faRightFromBracket  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const StudentMenuContainer = ({ onSelectOption, notificationsCount }) => {
  const [showOptions, setShowOptions] = useState(false);
  const router=useRouter();

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const handleOptionClick = (option) => {
    onSelectOption(option);
  };

  const handleSubOptionClick = (subOption) => {
    onSelectOption(subOption);
  };
  const handleLogoutClick=() =>{
    localStorage.removeItem("token");
    router.push("http://localhost:3000");

  };

  return (
    <div className={styles.menucontainer}>

      <div className={styles.menulogo}> <img src="/LogoOrangebg1.png" alt="Image" /></div>

      <div className={styles.menu}>

        <ul>
        
          <li onClick={() => handleOptionClick('home')}>  <span className={styles.icon}>  <FontAwesomeIcon icon={faHouse} /> </span>  Home</li>
          <li onClick={() => handleOptionClick('my-profile')}> <span className={styles.icon}> <FontAwesomeIcon icon={faUser} /> </span>  My Profile </li>
          <li onClick={() => handleOptionClick('my-tutors')}> <span className={styles.icon}> <FontAwesomeIcon icon={faPersonChalkboard}/> </span> My Tutors  </li>
          <li onClick={() => handleOptionClick('all-batches')}>  <span className={styles.icon}> <FontAwesomeIcon icon={faPeopleGroup} /> </span>All Batches  </li>
          <li onClick={() => handleOptionClick('enrolled-batches')}> <span className={styles.icon}> <FontAwesomeIcon icon={faUsersLine} /> </span>  Enrolled Batches </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.requestTutor}
          >
            <span className={styles.icon}> <FontAwesomeIcon icon={faEnvelope} /></span>
            Manage request
            {showOptions && (
              <div className={styles.subOptionsContainer}>
              <ul  className= {styles.subOptions} >
                <li onClick={() => handleSubOptionClick('post-request')}>Create request</li>
                <li onClick={() => handleSubOptionClick('handle-offer')}>My offers</li>
                <li onClick={() => handleSubOptionClick('handle-request')}>My requests</li>
              </ul>
              </div>
            )}
          </li>
          {/* <li onClick={() => handleOptionClick('notifications')}>Notifications</li> */}
          <li onClick={() => handleOptionClick('notifications')}>
          <span className={styles.icon}><FontAwesomeIcon icon={faBell} /> </span> Notifications {notificationsCount > 0 && <span className={styles.notificationCount}>{notificationsCount}</span>}
          </li>
          <li onClick={() => handleOptionClick('demo-lectures')}><span className={styles.icon}><FontAwesomeIcon icon={faCirclePlay} /></span>Demo Lectures</li>
          <li onClick={handleLogoutClick}> <span className={styles.icon}>  <FontAwesomeIcon icon={faRightFromBracket} /> </span> Logout</li>
        </ul>
      </div>
    </div>
  );
};





export default StudentMenuContainer;
