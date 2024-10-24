import { useState, useEffect } from "react";
import React from 'react'
import ReactPlayer from 'react-player'
import styles from '../styles/DemoTutors.module.css';
import 'normalize.css';
import { faXmark, faTrashCan, faArrowLeft, faCheckCircle, faUpload, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const DemoLectures = ({ tutorid }) => {
  const [title, setTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [demoLectures, setDemoLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filteredLectures,setFilteredLectures]=useState([]);



  const fetchDemoLectures = async () => {
    try {
      const response = await fetch('/api/getAllDemoLecturesTutor');
      const data = await response.json();
      console.log(data);
      setDemoLectures(data);
    } catch (error) {
      console.error('Error fetching demo lectures:', error);
    }
  };

  useEffect(() => {
    fetchDemoLectures();
  }, []);

  useEffect(() => {
    filterLectures();
  }, [searchTerm, demoLectures]);

  const handleAddLecture = async (e) => {
    e.preventDefault();

    const demodata =
    {
      tutorid,
      title,
      videoLink

    }
    console.log(demodata);
    try {
      const response = await fetch('/api/addDemoLecture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demodata),
      });

      const data = await response.json();
      console.log(data);
      if (data.success == true) {
        setSuccessMessage('Demo Lecture Added Successfully');
        fetchDemoLectures();


      } else {
        setSuccessMessage('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setTitle('');
    setVideoLink('');


  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage('');
  };




  // const filteredLectures = demoLectures.filter(
  //   (lecture) =>
  //     lecture.TITLE.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     lecture.TUTOR_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // const filterLectures = () => {
  //   let filtered= [...demoLectures];

  //   if (searchTerm) {
  //     filtered = filtered.filter((lecture) =>
  //          lecture.TITLE.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //          lecture.TUTOR_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }
  //   setFilteredLectures(filtered);
  // };
  const filterLectures = () => {
    if (searchTerm.trim() === '') {
      // If the search term is empty, show all lectures
      setFilteredLectures([...demoLectures]);
    } else {
      // Otherwise, filter based on the search term
      const filtered = demoLectures.filter((lecture) =>
        lecture.TITLE.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecture.TUTOR_NAME.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLectures(filtered);
    }
  };
  
  const [showAddLecture, setShowAddLecture] = useState(false);

  function handleToggleAddLecture() {
    setShowAddLecture(!showAddLecture);

  }

  function handleCloseAddLecture() {
    setShowAddLecture(false);
  }



  return (
    <div className={styles.container}>
      <div className={styles.separator}>

        <div className={styles.wrapper}>


          {showAddLecture && (
            <div className={styles.addLectureContainer}>

              <button className={styles.closeButton} onClick={handleCloseAddLecture}>
                <FontAwesomeIcon icon={faXmark} /> {/* FontAwesome icon for "X" */}
              </button>

               

                <div className={styles.addlecturemainpart}>

                <h2>Add Demo Lecture</h2>

                <form className={styles.addLectureForm} onSubmit={handleAddLecture}>

                  <div className={styles.addLectureFormDetails}>

                    <div className={styles.fieldcontainer}>
                      <p className={styles.fieldname}> Title :</p>
                      <input
                        className={styles.fieldvalue}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.fieldcontainer}>
                      <p className={styles.fieldname}> Video Link :</p>
                      <input
                        className={styles.fieldvalue}
                        type="text"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        required
                      />
                    </div>

                  </div>

                  <button className={styles.submitbtn} type="submit">Add Lecture</button>

                </form>

                </div>


                {successMessage && (<div className={styles.confirmmodal}>

                  <FontAwesomeIcon  className={styles.icon} icon={faUpload} />
                  <p>{successMessage}</p>
                  <button className={styles.okbtn} onClick={handleCloseSuccessMessage}>OK</button>

                </div>)}


            </div>
          )}

          <div className={`${styles.demoLecturesList} ${showAddLecture ? styles.blurBackground : ''}`}>

            <h2>Demo Lectures</h2>

            <div className={styles.searchandbutton}>
              <input
                className={styles.demoSearch}
                type="text"
                placeholder="Search by Title or Tutor Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button className={styles.addlecturebtn} onClick={handleToggleAddLecture} >Add Lecture</button>
            </div>



            <div className={styles.lectureBoxWrapper}>


              {filteredLectures.map((lecture) => (

                <div key={lecture.LINK} className={styles.lectureBox}>
                  {/* Embed video using iframe */}

                  


                  <div className={styles.videoContainer}>
                    <ReactPlayer url={lecture.LINK} controls={true} className={styles.videoPlayer} width='670px' height='376.875px' />
                  </div>

                  <p className={styles.titletext}> <b> TITLE : </b> &nbsp;   {lecture.TITLE}</p>
                  <p className={styles.uploadertext}><b> UPLOADER : </b> &nbsp;     {lecture.TUTOR_NAME}</p>
                  

                </div>

              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoLectures;




