import React, { useEffect, useState } from 'react';
import styles from '../styles/TutorOffers.module.css';
import 'normalize.css';
import { faXmark, faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const MyOffers = ({ tutorid }) => {
  const [offers, setOffers] = useState([]);



  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch(`/api/TutorOffers?tutorId=${tutorid}`);
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const handleAcceptOffer = async (offerId, studentId, tutorId) => {
    try {
      const response = await fetch(`/api/AcceptOffers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offerId, studentId, tutorId }),
      });
      const data = await response.json();
      console.log(data);
      fetchOffers();
    } catch (error) {
      console.error('Error accepting offer:', error);
    }
  };


  const handleRejectOffer = async (offerId) => {
    try {
      const response = await fetch(`/api/RejectOffers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offerId }),
      });
      const data = await response.json();
      console.log(data);
      fetchOffers();

    } catch (error) {
      console.error('Error rejecting offer:', error);
    }
  };

  return (
    <div className={styles.container} >

      <div className={styles.wrapper} >

        <h2>My Offers</h2>

        <div className={styles.cardwrapper} >
          {offers.map((offer) => (

            <div className={styles.studentcard} key={offer.OFFER_ID} >

              <div className={styles.imgcontainer} >
                <img className={styles.studentimg} src={offer.IMAGE} alt="Image" />
              </div>

              <div className={styles.studentdetails} >

                <p className={styles.Name}> {cap(offer.NAME)}  </p>
                <p className={styles.Class}> {cap(offer.CLASS)}</p>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Institution:</p>
                  <p className={styles.fieldvalue}> {cap(offer.INSTITUTION)} </p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Subject:</p>
                  <p className={styles.fieldvalue}> {cap(offer.SUBJECTS)} </p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Days per Week:</p>
                  <p className={styles.fieldvalue}> {offer.DAYS_PER_WEEK} </p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Tuition Type:</p>
                  <p className={styles.fieldvalue}> <span className={styles.Type}>{cap(offer.TUITION_TYPE)} </span></p>
                </div>



                {/* <h3> Name: {cap(offer.NAME)} </h3>
          <p> {cap(offer.CLASS)} </p>
          <p> Institution: {cap(offer.INSTITUTION)} </p>
          <p> Subject: {cap(offer.SUBJECTS)} </p>
          <p> Days per Week: {offer.DAYS_PER_WEEK} </p>
          <p> Tuition Type: {offer.TUITION_TYPE}</p> */}
                {offer.NOTE ? <p className={styles.note}> <b>Note:</b> {cap(offer.NOTE)}</p> : null}

              </div>

              <div className={styles.btncontainer}>
                <button className={styles.acceptbtn} onClick={() => handleAcceptOffer(offer.OFFER_ID, offer.STUDENT_ID, offer.TUTOR_ID)}>Accept</button>

                <button className={styles.rejectbtn} onClick={() => handleRejectOffer(offer.OFFER_ID)}>Reject</button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOffers;
