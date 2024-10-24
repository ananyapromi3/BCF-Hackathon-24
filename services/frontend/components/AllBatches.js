// pages/allbatches.js
import { useEffect, useState } from 'react';
import styles from '../styles/AllBatches.module.css';
import 'normalize.css';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';


const AllBatches = ({ studentId }) => {
    const [allBatches, setAllBatches] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [batchToJoin, setBatchToJoin] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetchAllBatches();
    }, []);

    const fetchAllBatches = async () => {
        try {
            const response = await fetch('/api/allbatches');
            const data = await response.json();
            setAllBatches(data);
        } catch (error) {
            console.error('Error fetching all batches:', error);
        }
    };
    const handleJoinBatch = (batchId) => {
        setBatchToJoin(batchId);
        setShowConfirmation(true);
    };

    const confirmJoinBatch = async () => {
        try {
            const response = await fetch(`/api/joinbatch?studentId=${studentId}&batchId=${batchToJoin}`, {
                method: 'POST',
            });
            const data = await response.json();
            if (data.message == "Joined") {
                setErrorMessage('Joined successfully!');
                fetchAllBatches();
            }
            else if (data.message == 'Already joined') {
                setErrorMessage('You are already joined in this batch');
                fetchAllBatches();
            }
            else {

                fetchAllBatches();
                setErrorMessage('Your class does not match the batch class');
            }
        } catch (error) {
            console.error('Error Joining batch:', error);
            setErrorMessage('Could not join the batch.');
        }
        setShowConfirmation(false);
    };
    const handleCloseErrorMessage = () => {
        setErrorMessage(null);
    };

    const cancelJoinBatch = () => {
        setBatchToJoin(null);
        setShowConfirmation(false);
    };

    return (


        <div className={styles.container}>

            <div className={styles.wrapper}>
                <h1>All Batches</h1>


                <div className={styles.batchcontainerwrapper}>

                    {errorMessage && (
                        <div className={styles.confirmationmodal}>
                            <p>{errorMessage}</p>
                            <button className={styles.errorokbtn} onClick={handleCloseErrorMessage}>OK</button>
                        </div>
                    )}

                    {allBatches.length === 0 ? (

                        <div className={styles.nothingmsgcontainer}>
                            <FontAwesomeIcon className={styles.erroricon} icon={faCircleExclamation} />
                            <p className={styles.nothingmsg}>No batches available</p>
                        </div>

                    ) : (


                        allBatches.map((batch, index) => (

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

                                        <div className={styles.fieldcontainer}>
                                            <p className={styles.fieldname}> Tutor email :</p>
                                            <p className={styles.fieldvalue}> {batch.EMAIL} </p>
                                        </div>
                                    </div>


                                    {/* <p>Tutor : {batch.NAME} ( {batch.INSTITUTE}, {batch.FIELD_OF_STUDY})</p>
                                    <p>Subject : {batch.SUBJECT}</p>
                                    <p>Class of Batch : {batch.BATCH_CLASS}</p>
                                    <p>Days Per Week : {batch.DAYS_PER_WEEK}</p>
                                    <p>Class Start Time : {batch.CLASS_TIME}</p>
                                    <p>Tutor Contact No.: {batch.PHONE_NUMBER}</p>
                                    <p>Tutor email : {batch.EMAIL}</p> */}
                                </div>


                                <div className={styles.btncontainer}>
                                    <button className={styles.joinbtn} onClick={() => handleJoinBatch(batch.BATCH_ID)}>Join</button>
                                </div>
                                <hr />
                            </div>
                        ))



                    )}

                </div>




                {showConfirmation && (
                    <div className={styles.confirmationmodal}>
                        <p>Are you sure you want to join the batch?</p>

                        <div className={styles.confirmbtns}>
                            <button className={styles.yes} onClick={confirmJoinBatch}>Yes</button>
                            <button className={styles.no} onClick={cancelJoinBatch}>No</button>
                        </div>


                    </div>
                )}

            </div>
        </div>
    );
};

export default AllBatches;
