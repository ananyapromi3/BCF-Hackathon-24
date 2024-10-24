// import { useState, useEffect } from 'react';

// const batchContainerStyle = {
//   display: "flex",
//   flexWrap: "wrap",
//   justifyContent: "center", 
// };

// const batchStyle = {
//   border: "1px solid #ccc",
//   padding: "20px",
//   margin: "20px",
//   width: "300px",
//   borderRadius: "8px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
//   background: "#ffffff",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// };

// const headerStyle = {
//   fontSize: "1.5rem",
//   marginBottom: "10px",
// };

// const detailStyle = {
//   fontSize: "1rem",
//   marginBottom: "5px",
// };

// const BatchesContainer = ({ tutorid }) => {
//   const [batches, setBatches] = useState([]);

//   useEffect(() => {
//     fetchBatches();
//   }, []);

//   const fetchBatches = async () => {
//     try {
//       const response = await fetch(`/api/tutorbatchcontent?tutorId=${tutorid}`);
//       const data = await response.json();
//       console.log("data", data);
//       setBatches(data);
//     } catch (error) {
//       console.error("Error fetching batches:", error);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Batches</h2>
//       <div style={batchContainerStyle}>
//         {batches.map((batch) => (
//           <div key={batch.BATCH_ID} style={batchStyle}>
//             <h3 style={headerStyle}>Class {batch.BATCH_CLASS}</h3>
//             <p style={detailStyle}>Class Time: {batch.CLASS_TIME}</p>
//             <p style={detailStyle}>Subject: {batch.SUBJECT}</p>
//             <p style={detailStyle}>Days Per Week: {batch.DAYS_PER_WEEK}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BatchesContainer;

// import { useState, useEffect } from 'react';

// const batchContainerStyle = {
//   display: "flex",
//   flexWrap: "wrap",
//   justifyContent: "center",
// };

// const batchStyle = {
//   border: "1px solid #ccc",
//   padding: "20px",
//   margin: "20px",
//   width: "300px",
//   borderRadius: "8px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//   background: "#ffffff",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// };

// const headerStyle = {
//   fontSize: "1.5rem",
//   marginBottom: "10px",
// };

// const detailStyle = {
//   fontSize: "1rem",
//   marginBottom: "5px",
// };

// const BatchesContainer = ({ tutorid }) => {
//   const [batches, setBatches] = useState([]);
//   const [newBatchInfo, setNewBatchInfo] = useState({
//     classTime: '',
//     subject: '',
//     daysPerWeek: '',
//     s_class:'',
//   });

//   useEffect(() => {
//     fetchBatches();
//   }, []);

//   const fetchBatches = async () => {
//     try {
//       const response = await fetch(`/api/tutorbatchcontent?tutorId=${tutorid}`);
//       const data = await response.json();
//       console.log("data", data);
//       setBatches(data);
//     } catch (error) {
//       console.error("Error fetching batches:", error);
//     }
//   };

//   const handleCreateBatch = async (e) => {
//     e.preventDefault();


//     const batchdata = 

//     {
//       tutorid: parseInt(tutorid),
//       s_class: newBatchInfo.s_class, 
//       subject: newBatchInfo.subject,
//       daysPerWeek: parseInt(newBatchInfo.daysPerWeek),
//       classTime: newBatchInfo.classTime,
//     }

//     console.log(batchdata);

//     try {
//       const response = await fetch('/api/addBatch', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(batchdata),
//       });

//       const data = await response.json();
//       console.log(data);
//       if (data.success == true) {
//         // setSuccessMessage('Batch Added Successfully');
//         fetchBatches();

//       } 
//       else {
//         // setSuccessMessage('Error');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     setNewBatchInfo({
//       classTime: '',
//       subject: '',
//       daysPerWeek: '',
//       s_class: '',
//     });

//     fetchBatches();
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <div style={{ flex: 1, padding: "20px" }}>
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Batches</h2>
//         <div style={batchContainerStyle}>
//           {batches.map((batch) => (
//             <div key={batch.BATCH_ID} style={batchStyle}>
//               <h3 style={headerStyle}>Class {batch.BATCH_CLASS}</h3>
//               <p style={detailStyle}>Class Time: {batch.CLASS_TIME}</p>
//               <p style={detailStyle}>Subject: {batch.SUBJECT}</p>
//               <p style={detailStyle}>Days Per Week: {batch.DAYS_PER_WEEK}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div style={{ flex: 1, padding: "20px" }}>
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Batch</h2>
//         <form onSubmit={handleCreateBatch} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//   <input
//     type="text"
//     placeholder="s_class"
//     value={newBatchInfo.s_class}
//     onChange={(e) => setNewBatchInfo({ ...newBatchInfo, s_class: e.target.value })}
//     required
//     style={{ width: "200px", marginBottom: "10px" }}
//   />
//   <input
//     type="text"
//     placeholder="Class Time"
//     value={newBatchInfo.classTime}
//     onChange={(e) => setNewBatchInfo({ ...newBatchInfo, classTime: e.target.value })}
//     required
//     style={{ width: "200px", marginBottom: "10px" }}
//   />
//   <input
//     type="text"
//     placeholder="Subject"
//     value={newBatchInfo.subject}
//     onChange={(e) => setNewBatchInfo({ ...newBatchInfo, subject: e.target.value })}
//     required
//     style={{ width: "200px", marginBottom: "10px" }}
//   />
//   <input
//     type="text"
//     placeholder="Days Per Week"
//     value={newBatchInfo.daysPerWeek}
//     onChange={(e) => setNewBatchInfo({ ...newBatchInfo, daysPerWeek: e.target.value })}
//     required
//     style={{ width: "200px", marginBottom: "10px" }}
//   />
//   <button type="submit" style={{ width: "200px", marginBottom: "10px", margin: "0 auto" }}>Create Batch</button>
// </form>


//       </div>
//     </div>
//   );
// }

// export default BatchesContainer;

import { useState, useEffect } from 'react';
import styles from '../styles/TutorBatchesReal.module.css';
import 'normalize.css';
import { faXmark, faTrashCan, faArrowLeft,faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const BatchesContainer = ({ tutorid }) => {
  const [batches, setBatches] = useState([]);
  const [newBatchInfo, setNewBatchInfo] = useState({
    classTime: '',
    subject: '',
    daysPerWeek: '',
    s_class: '',
  });

  const [selectedBatch, setSelectedBatch] = useState(null);
  const [students, setStudents] = useState([]);
  const [showAddBatch, setShowAddBatch] = useState(true);
  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await fetch(`/api/tutorbatchcontent?tutorId=${tutorid}`);
      const data = await response.json();
      console.log("data", data);
      setBatches(data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const handleCreateBatch = async (e) => {
    e.preventDefault();


    const batchdata =

    {
      tutorid: parseInt(tutorid),
      s_class: newBatchInfo.s_class,
      subject: newBatchInfo.subject,
      daysPerWeek: parseInt(newBatchInfo.daysPerWeek),
      classTime: newBatchInfo.classTime,
    }

    console.log("batchdata", batchdata);

    try {
      const response = await fetch('/api/addBatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchdata),
      });

      const data = await response.json();
      console.log(data);
      if (data.success == true) {
        // setSuccessMessage('Batch Added Successfully');
        fetchBatches();

      }
      else {
        // setSuccessMessage('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setNewBatchInfo({
      classTime: '',
      subject: '',
      daysPerWeek: '',
      s_class: '',
    });

    fetchBatches();
  };

  const handleBatchClick = async (batch) => {

    try {
      const response = await fetch(`/api/getStudentsForBatch?batchid=${batch.BATCH_ID}`);
      const data = await response.json();
      console.log("DATA HERE :");
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }

    setSelectedBatch(batch);
    setShowAddBatch(false);
  };

  const handleBackClick = () => {
    setSelectedBatch(null);
    setShowAddBatch(true);
  };






  return (
    <div className={styles.container}>

      <div className={styles.wrapper}>

        <div className={styles.section1} >
          <h2 >My Batches</h2>
          <div className={styles.batchCardWrapper} >
            {batches.map((batch) => (
              <div className={styles.batchCard} key={batch.BATCH_ID} onClick={() => handleBatchClick(batch)} >

                <h3 >Class <br/><span className={styles.classNo}>{batch.BATCH_CLASS}</span></h3>

                <div className={styles.batchCardDetails}>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Class Time: </p>
                  <p className={styles.fieldvalue}> {batch.CLASS_TIME} </p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Subject: </p>
                  <p className={styles.fieldvalue}> {batch.SUBJECT} </p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Days Per Week: </p>
                  <p className={styles.fieldvalue}> {batch.DAYS_PER_WEEK} </p>
                </div>

                {/* <h3 >Class {batch.BATCH_CLASS}</h3>
                <p >Class Time: {batch.CLASS_TIME}</p>
                <p >Subject: {batch.SUBJECT}</p>
                <p >Days Per Week: {batch.DAYS_PER_WEEK}</p> */}
                </div>
              </div>

            ))}

          </div>
        </div>


        <div className={styles.section2}>

          {showAddBatch && (
            <>

            <div className={`${styles.createBatchFormContainer} ${showAddBatch ? styles.transition : ''}`}>
              <div className={styles.createBatchFormContainerLeft}><FontAwesomeIcon icon={faPeopleGroup} className={styles.icon} /></div>

              <div className={styles.createBatchFormContainerRight}>
              <h2 >Create Batch</h2>


              <form className={styles.createBatchForm} onSubmit={handleCreateBatch}>
                

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Student Class: </p>
                  <p className={styles.fieldvalue}>
                    <input
                      type="text"
                      placeholder="Student Class"
                      value={newBatchInfo.s_class}
                      onChange={(e) => setNewBatchInfo({ ...newBatchInfo, s_class: e.target.value })}
                      required/>
                    </p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Class Time: </p>
                  <p className={styles.fieldvalue}>
                    <input
                      type="text"
                      placeholder="Class Time"
                      value={newBatchInfo.classTime}
                      onChange={(e) => setNewBatchInfo({ ...newBatchInfo, classTime: e.target.value })}
                      required/>
                    </p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Subject: </p>
                  <p className={styles.fieldvalue}>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={newBatchInfo.subject}
                      onChange={(e) => setNewBatchInfo({ ...newBatchInfo, subject: e.target.value })}
                      required/>
                    </p>
                </div>

                <div className={styles.fieldcontainer}>
                  <p className={styles.fieldname}> Days Per Week: </p>
                  <p className={styles.fieldvalue}>
                    <input
                       type="text"
                       placeholder="Days Per Week"
                       value={newBatchInfo.daysPerWeek}
                       onChange={(e) => setNewBatchInfo({ ...newBatchInfo, daysPerWeek: e.target.value })}
                       required/>
                    </p>
                </div>

                {/* <input
                  type="text"
                  placeholder="Student Class"
                  value={newBatchInfo.s_class}
                  onChange={(e) => setNewBatchInfo({ ...newBatchInfo, s_class: e.target.value })}
                  required

                />
                <input
                  type="text"
                  placeholder="Class Time"
                  value={newBatchInfo.classTime}
                  onChange={(e) => setNewBatchInfo({ ...newBatchInfo, classTime: e.target.value })}
                  required

                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={newBatchInfo.subject}
                  onChange={(e) => setNewBatchInfo({ ...newBatchInfo, subject: e.target.value })}
                  required

                />
                <input
                  type="text"
                  placeholder="Days Per Week"
                  value={newBatchInfo.daysPerWeek}
                  onChange={(e) => setNewBatchInfo({ ...newBatchInfo, daysPerWeek: e.target.value })}
                  required

                /> */}

                <button className={styles.createBatchBtn} type="submit" >Create Batch</button>

              </form>
                </div>
              </div>
            </>
          )}

         
            {!showAddBatch && (
              <>
               <div className={`${styles.studentCardContainer} ${!showAddBatch ? styles.transition : ''}`}>
               
                <h2 >Students in Batch</h2>


                <div className={styles.studentCardWrapper}>

                  {students.map((student) => (

                    <div className={`${styles.studentCard} ${styles.showdetails}`} key={student.USER_ID} >

                    
                       


                      <div className={styles.studentImgContainer}>
                        <img className={styles.studentImg} src={student.IMAGE} alt={student.NAME} />

                        
                      </div>

                      <h3 className={styles.studentCardName}>{student.NAME}</h3>

                      
                      <div className={`${styles.studentDetails} ${styles.hidden}`}> {/* Initially hidden */}

                      

                      <h2 >{student.NAME}</h2>

                      <div className={styles.fieldcontainer}>
                        <p className={styles.sfieldname}> Email :</p>
                        <p className={styles.fieldvalue}>{student.EMAIL}</p>
                      </div>

                      <div className={styles.fieldcontainer}>
                        <p className={styles.sfieldname}> Phone :</p>
                        <p className={styles.fieldvalue}>{student.PHONE_NUMBER}</p>
                      </div>

                      {/* <p >Email: {student.EMAIL}</p>
                      <p >Phone: {student.PHONE_NUMBER}</p> */}
                      </div>
                    </div>
                  ))}
                </div>

                <button className={styles.backBtn} onClick={handleBackClick}><FontAwesomeIcon icon={faArrowLeft} /></button>

                </div>
              </>

              
            )}

          
        </div>
      </div>
    </div>
  );
}

export default BatchesContainer;



