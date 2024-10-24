import React, { useEffect, useState } from 'react';
import styles from '../styles/MyTutors.module.css';
import 'normalize.css';
import { faXmark, faTrashCan, faCheck, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyTutors = ({ studentId }) => {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [showRatingBox, setShowRatingBox] = useState(false);

  useEffect(() => {
    fetchTutors();
  }, []);
  useEffect(() => {
    if (selectedTutor) {
      setRating(selectedTutor.RATING || 0);
      setReview(selectedTutor.REVIEW || '');
    }
  }, [selectedTutor]);
  //   useEffect(() => {
  //     if (showRatingBox) {
  //       setRating(selectedTutor.RATING || 0);
  //       setReview(selectedTutor.REVIEW || '');
  //     }
  //   }, [selectedTutor]);

  const fetchTutors = async () => {
    try {
      const response = await fetch(`/api/getTutorsByStudent?studentId=${studentId}`);
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  const handleTutorClick = (tutor) => {
    setSelectedTutor(tutor);
    setShowRatingBox(false);

    setShowTutorDetails(true);

  };

  const handleCloseClick = () => {
    setSelectedTutor(null);
    setRating(0);
    setReview('');
    setShowRatingBox(false);

    setShowTutorDetails(false);


  };
  const handleRateTutorClick = () => {
    setShowRatingBox(true);
    fetchTutors();
    setRating(selectedTutor.RATING || 0);
    setReview(selectedTutor.REVIEW || '');

  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmitRating = async () => {
    try {
      const response = await fetch('/api/submitRatingReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorId: selectedTutor.TUTOR_ID,
          studentId: studentId,
          postId: selectedTutor.POST_ID,
          offerId: selectedTutor.OFFER_ID,
          rating: rating,
          review: review,
        }),
      });

      if (response.ok) {
        // Handle successful response if needed
        console.log('Rating and review submitted successfully');
      } else {
        // Handle error response if needed
        console.error('Error submitting rating and review:', response.status);
      }
    } catch (error) {
      // Handle any other errors
      console.error('Error submitting rating and review:', error);
    }
    setSelectedTutor((prevTutor) => ({
      ...prevTutor,
      RATING: rating, // Replace with the correct key in your object
      REVIEW: review, // Replace with the correct key in your object
    }));

    // Reset the state
    setRating(0);
    setReview('');
    setShowRatingBox(false);

  };



  const [showTutorDetails, setShowTutorDetails] = useState(false);



  return (
    <div className={styles.container}>

      <div className={styles.wrapper}>
        {/* <div className={`${styles.wrapper} ${selectedTutor ? styles.blurBackground : ''}`}> */}




        <h2>My Tutors</h2>

        <div className={styles.tutorwrapper}>
          {/* <div className={`${styles.tutorwrapper} ${selectedTutor ? styles.blurBackground : ''}`}> */}

          {tutors.map((tutor) => (

            <div
              className={styles.tutoritem}
              key={tutor.TUTOR_ID}
              onClick={() => handleTutorClick(tutor)}>

              <div className={styles.tutoritemimgcontainer}>

                <img src={tutor.IMAGE} alt={tutor.NAME} className={styles.tutorimgsmall} />

              </div>

              <div className={styles.tutornameoverlay}>

                <p>{tutor.NAME}</p>

              </div>

            </div>

          ))}

        </div>

        {selectedTutor && (

          // <div className={styles.tutordetailsbox}>
          <div className={`${styles.tutordetailsbox} ${styles.blurBackground}`}>

            <div className={styles.tutorcard}>

              <div className={styles.tutordetailsection}>




                <div className={styles.tutordetailsstuff}>

                  <div className={styles.imgcontainer}>

                    <img src={selectedTutor.IMAGE} alt={selectedTutor.NAME} className={styles.tutorimgbig} />

                  </div>

                  <div className={styles.tutorinfo}>

                    <h1>Tutor Details: </h1>

                    <p className={styles.Name}> {selectedTutor.NAME} </p>

                    <p className={styles.Institution}> {selectedTutor.FIELD_OF_STUDY} ({selectedTutor.INSTITUTE}) </p>


                    <div className={styles.fieldcontainer}>
                      <p className={styles.fieldname}> Contact No. :</p>
                      <p className={styles.fieldvalue}> {selectedTutor.PHONE_NUMBER} </p>
                    </div>

                    <div className={styles.fieldcontainer}>
                      <p className={styles.fieldname}> Email :</p>
                      <p className={styles.fieldvalue}> {selectedTutor.EMAIL} </p>
                    </div>

                    <div className={styles.fieldcontainer}>
                      <p className={styles.fieldname}> Gender :</p>
                      <p className={styles.fieldvalue}> {selectedTutor.GENDER} </p>
                    </div>

                    <div className={styles.fieldcontainer}>
                      <p className={styles.fieldname}> Years of Experience :</p>
                      <p className={styles.fieldvalue}> {selectedTutor.YEARS_OF_EXPERIENCE} </p>
                    </div>


                    {/* <p>Tutor: {selectedTutor.NAME}( {selectedTutor.FIELD_OF_STUDY},{selectedTutor.INSTITUTE})</p>
                <p>Contact No.: {selectedTutor.PHONE_NUMBER}</p>
                <p>Email: {selectedTutor.EMAIL}</p>
                <p>Gender: {selectedTutor.GENDER}</p>
                <p>Years of Experience: {selectedTutor.YEARS_OF_EXPERIENCE}</p> */}




                    {showRatingBox ? (



                      // <div>

                      //   <p>Rating:</p>

                      //   <div className={styles.starRating}>

                      //     {[1, 2, 3, 4, 5].map((value) => (

                      //       <span
                      //         key={value}
                      //         className={`${styles.star} ${value <= rating ? styles.active : ''}`}
                      //         onClick={() => handleStarClick(value)}
                      //       >
                      //         ★
                      //       </span>

                      //     ))}

                      //   </div>

                      //   <p>Review:</p>

                      //   <textarea
                      //     rows="4"
                      //     value={review}
                      //     onChange={(e) => setReview(e.target.value)}
                      //   />

                      //   <button onClick={handleSubmitRating}>Submit</button>

                      // </div>
                      <div>

                        <div className={styles.fieldcontainer}>
                          <p className={styles.fieldname}> Rating :</p>
                          <p className={styles.fieldvalue}> <div className={styles.starRating}>

                            {[1, 2, 3, 4, 5].map((value) => (

                              <span
                                key={value}
                                className={`${styles.star} ${value <= rating ? styles.active : ''}`}
                                onClick={() => handleStarClick(value)}
                              >
                                ★
                              </span>

                            ))}

                          </div> </p>
                        </div>


                        <div className={styles.fieldcontainer}>
                          <p className={styles.fieldname}> Review :</p>
                          <p className={styles.fieldvalue}><textarea
                            rows="4"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                          />

                          </p>
                        </div>


                        <div className={styles.submitbtncontainer}>
                          <button className={styles.submitbtn} onClick={handleSubmitRating}>Submit</button>
                        </div>
                      </div>







                    ) : (

                      <div className={styles.ratebtncontainer}>

                        <button className={styles.ratebtn} onClick={handleRateTutorClick}>Rate Tutor</button>

                      </div>

                    )}

                  </div>
                </div>

              </div>

              {/* <button className={styles.closeButton} onClick={() => setSelectedTutor(null)}> Close </button> */}


              <div className={styles.tuitiondetailsection}>


                <h1>Tuition Details: </h1>

                <div className={styles.tuitiondetailinfo}>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.rfieldname}> Days per Week :</p>
                    <p className={styles.fieldvalue}> {selectedTutor.DAYS_PER_WEEK} </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.rfieldname}> Tuition type :</p>
                    <p className={styles.fieldvalue}> {selectedTutor.TUITION_TYPE} </p>
                  </div>


                  <div className={styles.fieldcontainer}>
                    <p className={styles.rfieldname}> Subjects :</p>
                    <p className={styles.fieldvalue}> {selectedTutor.SUBJECTS} </p>
                  </div>

                </div>



                {/* <h1>Tution Details: </h1>
                <p>Days per Week: {selectedTutor.DAYS_PER_WEEK}</p>
                <p>Tuition type: {selectedTutor.TUITION_TYPE}</p>
                <p>Subjects: {selectedTutor.SUBJECTS}</p>
 */}

              </div>

              <div>
                <button className={styles.closebtn} onClick={handleCloseClick}><FontAwesomeIcon icon={faXmark} /></button>
              </div>



            </div>

          </div>


        )}

      </div>
    </div>
  );
};

export default MyTutors;
