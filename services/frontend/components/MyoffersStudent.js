import React, { useEffect, useState } from 'react';
import styles from '../styles/MyoffersStudent.module.css';
import 'normalize.css';
import { faXmark, faTrashCan, faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyOffers = ({ studentId }) => {
    const [offers, setOffers] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [offerToCancel, setOfferToCancel] = useState(null);
    const [sortingOrder, setSortingOrder] = useState('latest');

    useEffect(() => {
        // Fetch offers and sort them by the selected sorting order
        fetchOffers();
    }, [sortingOrder]);

    const fetchOffers = async () => {
        try {
            // const response = await fetch(`/api/getOffersStudent?studentId=${studentId}`);
            // const data = await response.json();
            // setOffers(data);
            const response = await fetch(`/api/getOffersStudent?studentId=${studentId}`);
            const data = await response.json();
            let sortedOffers = data;

            if (sortingOrder === 'oldest') {
                sortedOffers = sortedOffers.sort((a, b) => new Date(a.TIMESTAMP) - new Date(b.TIMESTAMP));
            } else if (sortingOrder === 'latest') {
                sortedOffers = sortedOffers.sort((a, b) => new Date(b.TIMESTAMP) - new Date(a.TIMESTAMP));
            }

            setOffers(sortedOffers);
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };
    const handleCancelOffer = (offerId) => {
        setOfferToCancel(offerId);
        setShowConfirmation(true);
    };
    const cancelCancelOffer = () => {
        setOfferToCancel(null);
        setShowConfirmation(false);
    };

    const confirmCancelOffer = async () => {
        try {
            const response = await fetch(`/api/getOffersStudent?offerId=${offerToCancel}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the canceled offer from the list
                //setOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== offerId));
                fetchOffers();
            } else {
                console.error('Error canceling offer:', response.status);
            }
        } catch (error) {
            console.error('Error canceling offer:', error);
        }
        setOfferToCancel(null);
        setShowConfirmation(false);

    };
    const handleSortingChange = (event) => {
        setSortingOrder(event.target.value);
        fetchOffers();
    };
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Modify the format as needed
    };


    return (

        <div className={styles.container} >

            <div className={styles.wrapper} >

                <h2>My Offers</h2>

                <div className={styles.sortcontainer}>
                    <label>Sort by:</label>
                    <select value={sortingOrder} onChange={handleSortingChange}>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>

                <div className={styles.cardwrapper} >

                    {offers.length === 0 ? (



                        <div className={styles.nothingmsgcontainer}>
                            <FontAwesomeIcon className={styles.erroricon} icon={faCircleExclamation} />
                            <p className={styles.nothingmsg}>No offers</p>
                        </div>



                    ) : (
                        offers.map((offer) => (

                            <div className={styles.tutorcard} key={offer.OFFER_ID} >

                                <div className={styles.imgcontainer}>

                                    <img className={styles.tutorimg} src={offer.IMAGE} alt={offer.NAME} />

                                </div>

                                <div className={styles.tutordetails}>

                                    <p className={styles.Name}> {offer.NAME}  </p>

                                    <p className={styles.Institution}> {offer.INSTITUTE} ({offer.FIELD_OF_STUDY})  </p>

                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Years of Experience:</p>
                                        <p className={styles.fieldvalue}> {offer.YEARS_OF_EXPERIENCE} </p>
                                    </div>
                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Subjects:</p>
                                        <p className={styles.fieldvalue}> {offer.SUBJECTS} </p>
                                    </div>
                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Tuition Type:</p>
                                        <p className={styles.fieldvalue}>  <span className={styles.Type}>{offer.TUITION_TYPE}  </span> </p>
                                    </div>
                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Days per Week:</p>
                                        <p className={styles.fieldvalue}> {offer.DAYS_PER_WEEK} </p>
                                    </div>
                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Salary:</p>
                                        <p className={styles.fieldvalue}>  {offer.PREFERRED_SALARY} </p>
                                    </div>
                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Tutor Gender:</p>
                                        <p className={styles.fieldvalue}> {offer.GENDER} </p>
                                    </div>
                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Tutor Contact:</p>
                                        <p className={styles.fieldvalue}> {offer.PHONE_NUMBER} </p>
                                    </div>




                                    {/* <p>Tutor: {offer.NAME}( {offer.INSTITUTE},{offer.FIELD_OF_STUDY})</p>
                                <p>Years of Experience: {offer.YEARS_OF_EXPERIENCE}</p>
                                <p>Subjects: {offer.SUBJECTS}</p>
                                <p>Tuition Type: {offer.TUITION_TYPE}</p>
                                <p>Days per Week: {offer.DAYS_PER_WEEK}</p>
                                <p>Salary: {offer.PREFERRED_SALARY}</p>
                                <p>Tutor Gender: {offer.GENDER}</p>
                                <p>Tutor Contact: {offer.PHONE_NUMBER}</p> */}





                                    {offer.NOTE === null ? (

                                        <div className={styles.fieldcontainer}>
                                            <p className={styles.fieldname}> Note: </p>
                                            <p className={styles.fieldvalue}> No note </p>
                                        </div>


                                        // <p>Note : No note</p>
                                    ) : (

                                        <div className={styles.fieldcontainer}>
                                            <p className={styles.fieldname}> Note: </p>
                                            <p className={styles.fieldvalue}> {offer.NOTE} </p>
                                        </div>

                                        // <p>Note: {offer.NOTE}</p>


                                    )}

                                    <div className={styles.fieldcontainer}>
                                        <p className={styles.fieldname}> Time Posted: </p>
                                        <p className={styles.fieldvalue}> {formatTimestamp(offer.TIMESTAMP)} </p>
                                    </div>

                                    <p></p>
                                </div>

                                <div className={styles.btncontainer}>

                                    <button className={styles.cancelbtn} onClick={() => handleCancelOffer(offer.OFFER_ID)}>Cancel Offer</button>

                                </div>
                            </div>
                        ))
                    )}

                </div>

                {showConfirmation && (
                    <div className={styles.confirmationmodal}>
                        <p>Are you sure you want to cancel the offer?</p>

                        <div className={styles.confirmbtns}>
                            <button className={styles.yes} onClick={confirmCancelOffer}>Yes</button>
                            <button className={styles.no} onClick={cancelCancelOffer}>No</button>
                        </div>


                    </div>
                )}

            </div>

        </div>
    );
};

export default MyOffers;
