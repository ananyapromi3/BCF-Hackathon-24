import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import styles from '../styles/DemoStudents.module.css';
import 'normalize.css';


const DemoLectures = () => {
  const [demoLectures, setDemoLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDemoLectures = async () => {
    try {
      const response = await fetch('/api/getAllDemoLectures');
      const data = await response.json();
      setDemoLectures(data);
    } catch (error) {
      console.error('Error fetching demo lectures:', error);
    }
  };

  useEffect(() => {
    fetchDemoLectures();
  }, []);

  const filteredLectures = demoLectures.filter(
    (lecture) =>
      lecture.TITLE.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.TUTOR_NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.separator}>

        <div className={styles.wrapper}>


          <div className={styles.democontainer}>

            <div className={styles.demoLecturesList}>

              <h2>Demo Lectures List</h2>

              <div className={styles.searchandbutton}>
                <input
                  className={styles.demoSearch}
                  type="text"
                  placeholder="Search by Title or Tutor Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>



              <div className={styles.lectureBoxWrapper}>

                {filteredLectures.map((lecture) => (

                  <div key={lecture.LINK} className={styles.lectureBox}>

                    <div className={styles.videoContainer}>
                      <ReactPlayer url={lecture.LINK} controls={true} className={styles.videoPlayer} width='670px' height='376.875px' />
                    </div>

                    <p className={styles.uploadertext}><b> Uploader: </b> &nbsp;     {lecture.TUTOR_NAME}</p>
                    <p className={styles.titletext}><b> Title: </b> &nbsp;{lecture.TITLE}</p>

                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

  );
};

export default DemoLectures;
