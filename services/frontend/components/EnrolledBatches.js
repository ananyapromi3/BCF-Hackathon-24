// pages/enrolledbatches.js
import { useEffect, useState } from 'react';
import styles from '../styles/enrolledbatches.module.css';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EnrolledBatches = ({ studentId }) => {
    const [enrolledBatches, setEnrolledBatches] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [batchToLeave, setBatchToLeave] = useState(null);

    useEffect(() => {
        fetchEnrolledBatches();
    }, []);

    const fetchEnrolledBatches = async () => {
        try {
            const response = await fetch(`/api/enrolledbatches?studentId=${studentId}`);
            const data = await response.json();
            setEnrolledBatches(data);
        } catch (error) {
            console.error('Error fetching enrolled batches:', error);
        }
    };


    const handleLeaveBatch = (batchId) => {
        setBatchToLeave(batchId);
        setShowConfirmation(true);
    };

    const confirmLeaveBatch = async () => {
        try {
            const response = await fetch(`/api/leavebatch?studentId=${studentId}&batchId=${batchToLeave}`, {
                method: 'POST',
            });
            if (response.status === 200) {
                fetchEnrolledBatches();
            }
        } catch (error) {
            console.error('Error leaving batch:', error);
        }
        setShowConfirmation(false);
    };

    const cancelLeaveBatch = () => {
        setBatchToLeave(null);
        setShowConfirmation(false);
    };
    return (
        <div className={styles.container}>

            <div className={styles.wrapper}
            >
                <h1>Enrolled Batches</h1>

                <div className={styles.batchcontainerwrapper}>

                    {enrolledBatches.length === 0 ? (


                        <div className={styles.nothingmsgcontainer}>
                            <FontAwesomeIcon className={styles.erroricon} icon={faCircleExclamation} />
                            <p className={styles.nothingmsg}>You are not enrolled in any batch</p>
                        </div>


                    ) : (

                        enrolledBatches.map((batch, index) => (


                            <div key={batch.BATCH_ID} className={styles.batchcontainer}>

                                <div className={styles.batchdetails}>


                                    <div className={styles.topside}>
                                        <h2 className={styles.Batch}>Batch {index + 1}</h2>
                                    </div>


                                    <div className={styles.batchinfo}>

                                        <p className={styles.Name}> {batch.NAME} </p>

                                        <div className={styles.fieldcontainer}>
                                            <p className={styles.fieldname}> Institution :</p>
                                            <p className={styles.institutevalue}> {batch.INSTITUTE} ({batch.FIELD_OF_STUDY}) </p>
                                        </div>


                                        <div className={styles.fieldcontainer}>
                                            <p className={styles.fieldname}> Subject :</p>
                                            <p className={styles.fieldvalue}> {batch.SUBJECT} </p>
                                        </div>

                                        <div className={styles.fieldcontainer}>
                                            <p className={styles.fieldname}> Class of Batch :</p>
                                            <p className={styles.fieldvalue}> {batch.BATCH_CLASS} </p>
                                        </div>

                                        <div className={styles.fieldcontainer}>
                                            <p className={styles.fieldname}> Days Per Week :</p>
                                            <p className={styles.fieldvalue}> {batch.DAYS_PER_WEEK} </p>
                                        </div>

                                        <div className={styles.fieldcontainer}>
                                            <p className={styles.fieldname}> Class Start Time :</p>
                                            <p className={styles.fieldvalue}> {batch.CLASS_TIME} </p>
                                        </div>

                                        <div className={styles.fieldcontainer}>
                                            <p className={styles.fieldname}> Tutor Contact No. :</p>
                                            <p className={styles.fieldvalue}> {batch.PHONE_NUMBER} </p>
                                        </div>
                                    </div>





                                    {/* <h2><u>Batch {index + 1}</u></h2>
                            <p>Tutor : {batch.NAME} ( {batch.INSTITUTE}, {batch.FIELD_OF_STUDY})</p>
                            <p>Subject : {batch.SUBJECT}</p>
                            <p>Class of Batch : {batch.BATCH_CLASS}</p>
                            <p>Days Per Week : {batch.DAYS_PER_WEEK}</p>
                            <p>Class Start Time : {batch.CLASS_TIME}</p>
                            <p>Tutor Contact No.: {batch.PHONE_NUMBER}</p> */}

                                </div>


                                <div className={styles.btncontainer}>

                                    <button className={styles.leavebtn} onClick={() => handleLeaveBatch(batch.BATCH_ID)}>Leave</button>

                                </div>

                                <hr />

                            </div>
                        ))
                    )}
                    {showConfirmation && (
                        <div className={styles.confirmationmodal}>
                            <p>Are you sure you want to leave the batch?</p>

                            <div className={styles.confirmbtns}>
                                <button className={styles.yes} onClick={confirmLeaveBatch}>Yes</button>
                                <button className={styles.no} onClick={cancelLeaveBatch}>No</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnrolledBatches;
