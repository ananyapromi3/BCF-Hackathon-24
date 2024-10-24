// import React, { useEffect, useState } from 'react';
// import styles from '../styles/TutorTuitions.module.css';

// const MyTuitions = ({ tutorid }) => {
//   const [tuitions, setTuitions] = useState([]);

//   useEffect(() => {
//     fetchTuitions();
//   }, []);

//   const fetchTuitions = async () => {
//     try {
//       const response = await fetch(`/api/TutorTuitions?tutorId=${tutorid}`);
//       const data = await response.json();
//       setTuitions(data);
//     } catch (error) {
//       console.error('Error fetching tuitions:', error);
//     }
//   };

//   return (
//     <div className={styles.myTuitionsContainer}>
//       <h2 className={styles.myTuitionsHeading}>My Tuitions</h2>
//       {tuitions.map((tuition) => (
//         <div className={styles.tuitionCard} key={tuition.id}>
//           <img className={styles.studentImage} src={tuition.IMAGE} alt={`Student ${tuition.NAME}'s image`} />
//           <p className={styles.studentName}>{tuition.NAME}</p>
//           <p className={styles.studentName}>{tuition.CLASS}</p>
//           <p className={styles.studentName}>{tuition.INSTITUTION}</p>
//           <p className={styles.studentName}>{tuition.ROAD}, {tuition.AREA}</p>


//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyTuitions;


import React, { useEffect, useState } from 'react';
import styles from '../styles/TutorTuitions.module.css';
import 'normalize.css';
import { faSliders, faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyTuitions = ({ tutorid }) => {
  const [tuitions, setTuitions] = useState([]);
  const [selectedTuition, setSelectedTuition] = useState(null);

  useEffect(() => {
    fetchTuitions();
  }, []);

  const fetchTuitions = async () => {
    try {
      const response = await fetch(`/api/TutorTuitions?tutorId=${tutorid}`);
      const data = await response.json();
      // console.log("DATA",data)
      setTuitions(data);
    } catch (error) {
      console.error('Error fetching tuitions:', error);
    }
  };

  const handleTuitionClick = (tuition) => {
    setSelectedTuition(tuition);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>


        <div className={styles.leftColumn}>

          <h2 className={styles.myTuitionsHeading}>My Tuitions</h2>

          <div className={styles.leftwrapper}>
            {tuitions.map((tuition) => (
              <div
                // className={`${styles.tuitionCard} ${selectedTuition === tuition ? styles.selectedTuition : ''}`}
                className={styles.tuitionCard}
                key={tuition.id}
                onClick={() => handleTuitionClick(tuition)}
              >
                <div className={styles.smolimgcontainer}>
                  <img className={styles.smolimg} src={tuition.IMAGE} alt={`Student ${tuition.NAME}'s image`} />
                </div>
                <p className={styles.studentName}>{tuition.NAME}</p>
                {/* <p className={styles.studentName}>{tuition.CLASS}</p> */}
              </div>
            ))}

          </div>
        </div>



        <div className={styles.rightColumn}>


          {selectedTuition ? (

            <div className={styles.selectedtuition}>

              <div className={styles.selectedimgcontainer}>

                <img className={styles.selectedimg} src={selectedTuition.IMAGE} alt={`Student ${selectedTuition.NAME}'s image`} />

              </div>

              <div className={styles.selecteddetails}>

                <div className={styles.studentname}>
                  <p>{selectedTuition.NAME}</p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Institution: </p>
                  <p className={styles.fieldvalue}>{selectedTuition.INSTITUTION}</p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Phone Number: </p>
                  <p className={styles.fieldvalue}>{selectedTuition.PHONE_NUMBER}</p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Class: </p>
                  <p className={styles.fieldvalue}>{selectedTuition.CLASS}</p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Subjects: </p>
                  <p className={styles.fieldvalue}> {selectedTuition.SUBJECTS}</p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Address: </p>
                  <p className={styles.fieldvalue}>{selectedTuition.ROAD}, {selectedTuition.AREA}</p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Tuition Type: </p>
                  <p className={styles.fieldvalue}>{selectedTuition.TUITION_TYPE}</p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Days per Week: </p>
                  <p className={styles.fieldvalue}>{selectedTuition.DAYS_PER_WEEK}</p>
                </div>

              </div>

              {/* <p className={styles.studentName}>{selectedTuition.NAME}</p>
            <p className={styles.studentName}>{selectedTuition.NAME}</p> */}
              {/* Add other tuition details */}
              <button className={styles.cancelbtn} onClick={() => setSelectedTuition(null)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>


          ) : (
            <p className={styles.selectTuitionText}>Select a tuition to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTuitions;


