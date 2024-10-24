import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/TutorMenu.module.css"
import { useRouter } from "next/router";
import 'normalize.css';
import { faXmark, faTrashCan, faArrowLeft, faEnvelopesBulk, faEnvelopeCircleCheck, faEnvelopeSquare, faSquareEnvelope, faEnvelopeOpenText, faEnvelopeOpen, faEnvelope, faPerson, faUser, faUserGraduate, faPaperPlane, faUsers, faUsersLine, faUsersBetweenLines, faUserFriends, faCirclePlay, faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TutorMenuContainer = ({ onSelectOption, notificationsCount }) => {

  const [showOptions, setShowOptions] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const router = useRouter();

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleSubOptionClick = (subOption) => {
    onSelectOption(subOption);
    setActiveComponent('tuition-posts');
    setSelectedComponent('tuition-posts');
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };
  const handleMouseEnterHover = (option) => {
    setActiveComponent(option);
  };
  const handleMouseLeaveHover = () => {
    setActiveComponent(selectedComponent);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    router.push("http://localhost:3000");

  };

  const [activeComponent, setActiveComponent] = useState('');

  const handleOptionClick = (e) => {
    onSelectOption(e);
    setActiveComponent(e);
    setSelectedComponent(e);
  };





  return (

    <div className={styles.menucontainer}>

      <div className={styles.menulogo}> <img src="/LogoWhitebg.png" alt="Image" /></div>

      <div className={styles.menu}>

        <ul>

          <li

            //onMouseEnter={`${handleMouseEnter} ${()=>handleMouseEnterHover("tuition-posts")}`}
            onMouseEnter={() => {
              handleMouseEnter();
              handleMouseEnterHover("tuition-posts");
            }}
            onMouseLeave={() => {
              handleMouseLeave();
              handleMouseLeaveHover();
            }}
            // onMouseLeave={`${handleMouseLeave} ${handleMouseLeaveHover}`}
            className={`${styles.requestTutor} ${activeComponent === 'tuition-posts' ? styles.activeOption : ''}`}
          >

            <span className={styles.icon}>  <FontAwesomeIcon icon={faEnvelope} /> </span>  Tuition Posts
            {showOptions && (
              <div className={styles.subOptionsContainer}>
                <ul className={styles.subOptions}>
                  <li onMouseEnter={() => handleMouseEnterHover("tuition-posts")}
                    onMouseLeave={handleMouseLeaveHover} onClick={() => handleSubOptionClick('available-tuition')}>Available Tuitions</li>
                  <li onMouseEnter={() => handleMouseEnterHover("tuition-posts")}
                    onMouseLeave={handleMouseLeaveHover} onClick={() => handleSubOptionClick('applied-tuition')}>Applied Tuitions</li>

                </ul>
              </div>
            )}
          </li>



          <li className={activeComponent === 'my-profile' ? styles.activeOption : ''} onClick={() => handleOptionClick("my-profile")} onMouseEnter={() => handleMouseEnterHover("my-profile")}
            onMouseLeave={handleMouseLeaveHover}> <span className={styles.icon}>  <FontAwesomeIcon icon={faUser} /> </span> My Profile</li>

          <li className={activeComponent === 'my-tuitions' ? styles.activeOption : ''} onClick={() => handleOptionClick("my-tuitions")} onMouseEnter={() => handleMouseEnterHover("my-tuitions")}
            onMouseLeave={handleMouseLeaveHover}> <span className={styles.icon}>  <FontAwesomeIcon icon={faUserGraduate} /> </span> Tuitions </li>

          <li className={activeComponent === 'offers' ? styles.activeOption : ''} onClick={() => handleOptionClick("offers")} onMouseEnter={() => handleMouseEnterHover("offers")}
            onMouseLeave={handleMouseLeaveHover}> <span className={styles.icon}>  <FontAwesomeIcon icon={faPaperPlane} /> </span>  Offers </li>

          <li className={activeComponent === 'batches' ? styles.activeOption : ''} onClick={() => handleOptionClick("batches")} onMouseEnter={() => handleMouseEnterHover("batches")}
            onMouseLeave={handleMouseLeaveHover}> <span className={styles.icon}>  <FontAwesomeIcon icon={faUsers} /> </span> Batches </li>

          <li className={activeComponent === 'demo-lectures' ? styles.activeOption : ''} onClick={() => handleOptionClick("demo-lectures")} onMouseEnter={() => handleMouseEnterHover("demo-lectures")}
            onMouseLeave={handleMouseLeaveHover}> <span className={styles.icon}>  <FontAwesomeIcon icon={faCirclePlay} /> </span> Demo Lectures </li>

          <li className={activeComponent === 'notifications' ? styles.activeOption : ''} onClick={() => handleOptionClick('notifications')} onMouseEnter={() => handleMouseEnterHover("notifications")}
            onMouseLeave={handleMouseLeaveHover}>
            <span className={styles.icon}>  <FontAwesomeIcon icon={faBell} /> </span> Notifications {notificationsCount > 0 && <div className={styles.notificationCount}>{notificationsCount}</div>}
          </li>

          <li className={styles.options} onClick={handleLogoutClick} onMouseEnter={() => handleMouseEnterHover("logout")}
            onMouseLeave={handleMouseLeaveHover}> <span className={styles.icon}>  <FontAwesomeIcon icon={faRightFromBracket} /> </span> Logout </li>

        </ul>

      </div>

    </div>
  );
};

export default TutorMenuContainer;
