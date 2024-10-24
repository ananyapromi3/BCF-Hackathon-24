import { useState } from 'react';
import styles from '../styles/CreateTuition.module.css';
import 'normalize.css';
import { faXmark, faTrashCan, faCheck, faCheckCircle, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreateTuitionPost = ({ studentId }) => {
  const [salary, setSalary] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [tuitionType, setTuitionType] = useState('online');
  const [tutorGender, setTutorGender] = useState('any');
  const [subject, setSubject] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [note, setNote] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new tuition post using the state values
    const tuitionPostData = {
      studentId,
      salary,
      subject,
      daysPerWeek,
      tuitionType,
      tutorGender,
      note,
    };

    try {
      const response = await fetch('/api/createtuitionpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tuitionPostData),
      });

      if (response.status === 201) {
        setSuccessMessage('Tuition post created successfully.');
        // Reset the form after successful submission
        setSalary('');
        setDaysPerWeek('');
        setSubject('');
        setNote('');
        setTuitionType('online');
        setTutorGender('any');
      } else {
        // Handle error case (e.g., show error message)
      }
    } catch (error) {
      console.error('Error creating tuition post:', error);
    }
  };
  const handleCloseSuccessMessage = () => {
    setSuccessMessage(null);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div className={styles.container} >

      <div className={styles.wrapper} >






        <form onSubmit={handleSubmit} className={styles.formcard}>

          <div className={`${styles.left} ${isModalOpen ? styles.leftmodalopen : ''}`}>

                {isModalOpen ? (
                <FontAwesomeIcon className={styles.icon} icon={faCheckCircle} />
              ) : (
                <FontAwesomeIcon className={styles.icon} icon={faEnvelopeOpenText} />
              )}

            {isModalOpen && (
              <div className={styles.confirmationmodal}>
                <p>{successMessage}</p>
                <button className={styles.okbtn} onClick={() => { handleCloseSuccessMessage(); closeModal(); }}>OK</button>
              </div>
            )}

          </div>

          <div className={styles.right}>

            <h2>Create Tuition Post</h2>

            <div className={styles.formdetails}>







              <div className={styles.fieldcontainer}>
                <p className={styles.fieldname}> <label htmlFor="salary">Salary:</label></p>
                <p className={styles.fieldvalue}>
                  <input
                    type="text"
                    id="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  /> </p>
              </div>

              <div className={styles.fieldcontainer}>
                <p className={styles.fieldname}> <label htmlFor="subject">Subject:</label> </p>
                <p className={styles.fieldvalue}>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  /> </p>
              </div>

              <div className={styles.fieldcontainer}>
                <p className={styles.fieldname}> <label htmlFor="daysPerWeek">Days per Week:</label> </p>
                <p className={styles.fieldvalue}>
                  <select id="daysPerWeek" value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="4">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>

                  </select> </p>
              </div>

              <div className={styles.fieldcontainer}>
                <p className={styles.fieldname}> <label htmlFor="tuitionType">Tuition Type:</label> </p>
                <p className={styles.fieldvalue}>
                  <select id="tuitionType" value={tuitionType} onChange={(e) => setTuitionType(e.target.value)}>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select> </p>
              </div>

              <div className={styles.fieldcontainer}>
                <p className={styles.fieldname}> <label htmlFor="tutorGender">Tutor Gender:</label> </p>
                <p className={styles.fieldvalue}>
                  <select id="tutorGender" value={tutorGender} onChange={(e) => setTutorGender(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select> </p>
              </div>

              <div className={styles.fieldcontainer}>
                <p className={styles.fieldname}> <label>Note:</label> </p>
                <p className={styles.fieldvalue}>
                  <textarea
                    //className={styles.offertutornote}
                    placeholder="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea> </p>
              </div>










              {/* 
            <div>
              <label htmlFor="salary">Salary:</label>
              <input
                type="text"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="daysPerWeek">Days per Week:</label>
              <select id="daysPerWeek" value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="4">5</option>
                <option value="6">6</option>
                <option value="7">7</option>

              </select>
            </div>

            <div>
              <label htmlFor="tuitionType">Tuition Type:</label>
              <select id="tuitionType" value={tuitionType} onChange={(e) => setTuitionType(e.target.value)}>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div>
              <label htmlFor="tutorGender">Tutor Gender:</label>
              <select id="tutorGender" value={tutorGender} onChange={(e) => setTutorGender(e.target.value)}>
                <option value="any">Any</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label>Note:</label>
              <textarea
                //className={styles.offertutornote}
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div> */}

            </div>

            <div className={styles.btncontainer}>
              <button className={styles.createbtn} onClick={openModal} type="submit">Create Post</button>
            </div>

          </div>

        </form>



      </div>
    </div>
  );
};

export default CreateTuitionPost;