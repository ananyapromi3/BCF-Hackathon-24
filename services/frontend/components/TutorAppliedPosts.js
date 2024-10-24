import React, { useEffect, useState } from 'react';
import styles from '../styles/AppliedTuitionPosts.module.css';
import 'normalize.css';
import { faXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const imageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
};

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function AppliedTuitionPostsContainer({ tutorid }) {
  const [appliedPosts, setAppliedPosts] = useState([]);
  const tutor_id = parseInt(tutorid);
  // console.log('tutor_id', tutor_id);
  useEffect(() => {
    fetchAppliedPosts();
  }, []);

  const fetchAppliedPosts = async () => {
    try {
      const response = await fetch(`/api/AppliedTuitionPosts?tutorId=${tutor_id}`);
      const data = await response.json();
      console.log("DATA", data)
      setAppliedPosts(data);
      console.log("Applied posts -----", appliedPosts);
    } catch (error) {

      console.error('Error fetching applied posts:', error);
    }
  };

  const handleCancelApplication = async (postId) => {
    try {
      const response = await fetch(`/api/CancelApplication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, tutor_id }),
      });
      const data = await response.json();
      console.log(data);
      fetchAppliedPosts();
    } catch (error) {
      console.error('Error cancelling application:', error);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.separator}>

        <h2>Applied Tuition Posts</h2>

        <div className={styles.postcardwrapper}>
          {appliedPosts.map((post) => (



            <div className={styles.postcard} key={post.POST_ID}>
              <div className={styles.postimgcontainer}>
                <img className={styles.postimg} src={post.IMAGE} alt="Student Image" />
              </div>
              <div className={styles.postdetails}>
                <p className={styles.Name}> {(post.NAME)}  </p>
                <p className={styles.Class}> {(post.CLASS)} || {(post.INSTITUTION)}</p>
                {/* <p> Subjects: {cap(post.SUBJECTS)}</p> */}

                {/* If subject isn't blank, it will print the subjects. Other wise, it'll print not specified */}

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Subjects:</p>
                  <p className={styles.fieldvalue}>{post.SUBJECTS ? (post.SUBJECTS) : 'Not Specified'}</p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Tuition Type:</p>
                  <p className={styles.fieldvalue}><span className={styles.Type}>{(post.TUITION_TYPE)}</span></p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Salary:</p>
                  <p className={styles.fieldvalue}>{post.SALARY}</p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Location:</p>
                  <p className={styles.fieldvalue}>{(post.ROAD)}, {(post.AREA)}, {(post.CITY)}</p>
                </div>

                {post.NOTE ? <p> Note: {(post.NOTE)}</p> : null}
              </div>
              <button className={styles.cancelbtn} onClick={() => handleCancelApplication(post.POST_ID)}><FontAwesomeIcon icon={faTrashCan} /></button>
            </div>


          ))}
        </div>
      </div>
    </div>
  );
}

export default AppliedTuitionPostsContainer;
