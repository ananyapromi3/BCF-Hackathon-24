// components/Home.js
import 'normalize.css';
import { useState, useEffect } from 'react';
import styles from "../styles/StudentHome.module.css";
import { faGraduationCap, faPersonChalkboard, faEnvelope, faEyeSlash, faEye, faUser, faMagnifyingGlass, faStar, faSliders, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import cx from 'classnames';


function Home({ studentId }) {
  const [tutors, setTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    highestSalary: '',
    minExperience: '',
    gender: '',
    availability: '',
  });
  const [selectedTutor, setSelectedTutor] = useState(null); // To hold the selected tutor
  const [showOfferComponent, setShowOfferComponent] = useState(false); // To show/hide the "Offer Tutor" component
  const [subject, setSubject] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('1'); // New state for days per week
  const [tuitionType, setTuitionType] = useState('online'); // New state for tuition type
  const [note, setNote] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchTutors();
  }, []);
  useEffect(() => {
    filterTutors();
  }, [searchTerm, tutors, filterOptions]);

  const fetchTutors = async () => {
    try {
      const response = await fetch('/api/alltutors');
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };
  const [teachingSubjects, setTeachingSubjects] = useState([]); // To hold the selected tutor

  useEffect(() => {
    fetchTutorSubjects();
  }, [selectedTutor]);

  const fetchTutorSubjects = async () => {
    try {
      const parsedSelectedTutor = parseInt(selectedTutor.USER_ID);
      const response = await fetch(`/api/teachingSubjects?tutorId=${parsedSelectedTutor}`); // Replace with your API endpoint
      const data = await response.json();

      // console.log('data in teaching',data);

      // for(let i=0;i<data.length;i++)
      //   setTeachingSubjects(data[i]);

      setTeachingSubjects(data);
    } catch (error) {
      console.log(error);
    }
  };
  const filterTutors = () => {
    let filtered = [...tutors];

    if (searchTerm) {
      filtered = filtered.filter((tutor) =>
        tutor.NAME.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterOptions.highestSalary) {
      filtered = filtered.filter(
        (tutor) => tutor.PREFERRED_SALARY <= parseInt(filterOptions.highestSalary)
      );
    }

    if (filterOptions.minExperience) {
      filtered = filtered.filter(
        (tutor) => tutor.YEARS_OF_EXPERIENCE >= parseInt(filterOptions.minExperience)
      );
    }

    if (filterOptions.gender) {
      filtered = filtered.filter(
        (tutor) => tutor.GENDER.toLowerCase() === filterOptions.gender.toLowerCase()
      );
    }

    if (filterOptions.availability) {
      filtered = filtered.filter(
        (tutor) => tutor.AVAILABILITY.toLowerCase() === filterOptions.availability.toLowerCase()
      );
    }

    setFilteredTutors(filtered)
  };
  const handleFilterChange = (filter, value) => {
    let newValue = value;

    if (filter === 'highestSalary') {
      newValue = Math.max(0, parseInt(value)); // Ensure non-negative
      // newValue = Math.floor(newValue / 500) * 500; // Round down to the nearest 500
    } else if (filter === 'minExperience') {
      newValue = Math.max(0, parseInt(value)); // Ensure non-negative
    }

    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [filter]: newValue,
    }));
  };
  const handleTutorClick = (tutor) => {
    setSelectedTutor(tutor);
    setErrorMessage('');
    setShowOfferComponent(false);
    setSubject('');
    setNote('');
    setDaysPerWeek(''); // Close the "Offer Tutor" component when a tutor is clicked
  };

  const handleBackClick = () => {
    setSelectedTutor(null);
    setShowOfferComponent(false);
    setSubject('');
    setNote('');
    setDaysPerWeek(''); // Close the "Offer Tutor" component when going back
    setShowOverlay(true);
  };
  const handleOfferClick = () => {
    setShowOfferComponent(true);
    setShowOverlay(true);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleDaysPerWeekChange = (e) => {
    setDaysPerWeek(e.target.value);
  };

  const handleTuitionTypeChange = (e) => {
    setTuitionType(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  const handleCloseErrorMessage = () => {
    setErrorMessage(null);
    setShowConfirmation(false);
  };

  const handleCloseOffer = () => {
    setShowOfferComponent(false);
    setSubject('');
    setNote('');
    setDaysPerWeek('');
    setErrorMessage(null);

  };




  const handleSubmitOffer = async () => {
    const studentUserId = parseInt(studentId); // Replace with actual student user id
    const tutorUserId = selectedTutor.USER_ID;
    console.log(subject);
    const subjects = subject.map(subject=>subject).join(', ');
    console.log(subjects);

    try {
      const response = await fetch('/api/offerTutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentUserId,
          tutorUserId,
          subjects,
          daysPerWeek,
          tuitionType,
          note,
        }),
      });

      if (response.ok) {
        //console.log('Offer successfully sent!');
        // Optionally, you can clear the subject input and close the offer component
        const data = await response.json();
        console.log(data.message);
        if (data.message == "Offer successfully sent!") {
          setSubject('');
          setNote('');
          setDaysPerWeek('');
          setErrorMessage('Offer successfully sent! ');
          //setShowOfferComponent(false);

        }
        else if (data.message == "already teaching") {
          setErrorMessage('This tutor is already teaching you');
          setSubject('');
          setNote('');
          setDaysPerWeek('');
        }
        else {
          setErrorMessage('You have sent offer already !');
          setSubject('');
          setNote('');
          setDaysPerWeek('');
          console.error('Error sending offer:', response.status);

        }

      } else {
        setErrorMessage('You have sent offer already !');
        setSubject('');
        setNote('');
        setDaysPerWeek('');
        console.error('Error sending offer:', response.status);
      }
    } catch (error) {
      setErrorMessage('You have sent offer already !');
      setSubject('');
      setNote('');
      setDaysPerWeek('');
      console.error('Error sending offer:', error);
    }
    setShowConfirmation(true);
  };



  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Function to toggle the filter section
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const [showOverlay, setShowOverlay] = useState(true);







  return (
    <div className={styles.homecontainer}  >


      <div className={styles.filterwrapper}>

        <div className={`${styles.filtercontainer} ${isFilterOpen ? styles.open : styles.closed} `}>

          <div className={styles.filterdetails} >

            <h2>Filter</h2>











            <div className={styles.ffieldcontainer}>
              <p className={styles.ffieldname}> Maximum Salary :</p>
              <p className={styles.ffieldvalue}>
                <input className={styles.filterinput}
                  type="number"
                  value={filterOptions.highestSalary}
                  onChange={(e) => handleFilterChange('highestSalary', e.target.value)}
                />
              </p>
            </div>

            <div className={styles.ffieldcontainer}>
              <p className={styles.ffieldname}> Min Experience :</p>
              <p className={styles.ffieldvalue}>
                <input
                  className={styles.filterinput}
                  type="number"
                  value={filterOptions.minExperience}
                  onChange={(e) => handleFilterChange('minExperience', e.target.value)}
                />
              </p>
            </div>

            <div className={styles.ffieldcontainer}>
              <p className={styles.ffieldname}> Gender :</p>
              <p className={styles.ffieldvalue}>
                <select
                  className={styles.gender}
                  value={filterOptions.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}>
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </p>
            </div>

            <div className={styles.ffieldcontainer}>
              <p className={styles.ffieldname}> Availability :</p>
              <p className={styles.ffieldvalue}>
                <select
                  className={styles.availability}
                  value={filterOptions.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="yes">Available</option>
                  <option value="no">Not Available</option>
                </select>
              </p>
            </div>




            {/* 

            <div>
              <label>Maximum Salary:</label>
              <input className={styles.filterinput}
                type="number"
                value={filterOptions.highestSalary}
                onChange={(e) => handleFilterChange('highestSalary', e.target.value)}
              />
            </div>

            <div>
              <label>Min Experience:</label>
              <input
                className={styles.filterinput}
                type="number"
                value={filterOptions.minExperience}
                onChange={(e) => handleFilterChange('minExperience', e.target.value)}
              />
            </div>

            <div>
              <label>Gender:</label>
              <select
                className={styles.gender}
                value={filterOptions.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}>
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label>Availability:</label>
              <select
                className={styles.availability}
                value={filterOptions.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
              >
                <option value="">All</option>
                <option value="yes">Available</option>
                <option value="no">Not Available</option>
              </select>
            </div> */}

          </div>




        </div>


        <div className={styles.filterhandle} onClick={toggleFilter}><FontAwesomeIcon icon={faSliders} /></div>





      </div>




















      {/* <div className={styles.tutorwrapper}> */}
      <div className={`${styles.tutorwrapper} ${isFilterOpen ? styles.open : styles.closed} `}>

        <div className={styles.searchcontainer} >

          <input
            className={styles.searchbar}
            type="text"
            placeholder="Search by tutor name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchbtn} onClick={filterTutors}> <FontAwesomeIcon icon={faMagnifyingGlass} /> </button>

        </div>



        <div className={styles.tutorlist} >

          {filteredTutors.map((tutor) => (
            <div className={styles.tutoritem} key={tutor.USER_ID} onClick={() => handleTutorClick(tutor)}>

              <div className={styles.itemimgcontainer} >
                <img src={tutor.IMAGE} alt={tutor.NAME} className={styles.tutoritemimg} />
              </div>

              <div className={styles.nameoverlay} >

                <p>{tutor.NAME}</p>
              </div>

              {tutor.AVG_RATING !== null && (

                <div className={styles.ratingcontainer}>
                  <FontAwesomeIcon icon={faStar} className={styles.staricon} />
                  <span className={styles.ratingtext}>{parseInt(tutor.AVG_RATING).toFixed(1)}</span>
                </div>

              )}







            </div>

          ))}


        </div>











        <div className={styles.tutordetailcardcontainer}>

          {selectedTutor && (
            <div>
              {/* <div className={styles.tutordetailcard}> */}

              {showOverlay && <div className={styles.overlay}></div>}


              <div className={`${styles.tutordetailcard} ${showOfferComponent ? styles.extended : ''}`}>



                <div className={styles.carddefault}>
                  {/* <div className={`${styles.carddefault} ${showOfferComponent ? styles.extended : ''}`}> */}

                  <div className={styles.cardimgcontainer}>

                    <img src={selectedTutor.IMAGE} alt={selectedTutor.NAME} className={styles.cardimg} />

                  </div>

                  <div className={styles.carddetails}>

                    <h2>Tutor Details</h2>


                    <div className={styles.cardnameratecontainer}>



                      <p className={styles.cardName}> {selectedTutor.NAME}</p>



                      {selectedTutor.AVG_RATING !== null && (
                        <div className={styles.ratingContainer}>
                          <FontAwesomeIcon icon={faStar} className={styles.starIcon} />
                          <span className={styles.ratingText}>{parseInt(selectedTutor.AVG_RATING).toFixed(1)}</span>
                        </div>
                      )}

                    </div>


                    <div className={styles.carddetailsinfo}>

                      <div className={styles.fieldcontainer}>
                        <p className={styles.fieldname}> Education:</p>
                        <p className={styles.fieldvalue}> {selectedTutor.FIELD_OF_STUDY}, {selectedTutor.INSTITUTE} ({selectedTutor.DEGREE}) </p>
                      </div>


                      <div className={styles.fieldcontainer}>
                        <p className={styles.fieldname}> Years of Experience:</p>
                        <p className={styles.fieldvalue}> {selectedTutor.YEARS_OF_EXPERIENCE} </p>
                      </div>

                      <div className={styles.fieldcontainer}>
                        <p className={styles.fieldname}> Preferred Salary:</p>
                        <p className={styles.fieldvalue}> {selectedTutor.PREFERRED_SALARY} </p>
                      </div>

                      <div className={styles.fieldcontainer}>
                        <p className={styles.fieldname}> Gender:</p>
                        <p className={styles.fieldvalue}> {selectedTutor.GENDER} </p>
                      </div>

                      <div className={styles.fieldcontainer}>
                        <p className={styles.fieldname}> Contact No. :</p>
                        <p className={styles.fieldvalue}> {selectedTutor.PHONE_NUMBER} </p>
                      </div>

                      <div className={styles.fieldcontainer}>
                        <p className={styles.fieldname}> Average Rating:</p>
                        <p className={styles.fieldvalue}> {selectedTutor.AVG_RATING} </p>
                      </div>

                      <div className={styles.fieldcontainer}>
                        <p className={styles.fieldname}> Address:</p>
                        <p className={styles.fieldvalue}> {selectedTutor.ROAD}, {selectedTutor.AREA}, {selectedTutor.CITY} </p>
                      </div>

                      <div className={styles.tutorbtncontainer}>

                        <button className={styles.tutorbackbtn} onClick={handleBackClick}>Back</button>
                        <button className={styles.tutorofferbtn} onClick={handleOfferClick}>Offer Tutor</button>

                      </div>

                    </div>




                  </div>






                  {/* <p><b>Education:</b> {selectedTutor.FIELD_OF_STUDY},{selectedTutor.INSTITUTE}({selectedTutor.DEGREE})</p>

                <p><b>Years of Experience:</b> {selectedTutor.YEARS_OF_EXPERIENCE}</p>

                <p><b>Preferred Salary:</b> {selectedTutor.PREFERRED_SALARY}</p>
                <p><b>Gender:</b> {selectedTutor.GENDER}</p>

                <p><b>Contact No.:</b> {selectedTutor.PHONE_NUMBER}</p>
                <p><b>Average Rating:</b> {selectedTutor.AVG_RATING}</p>
                <p><b>Address:</b> {selectedTutor.ROAD},{selectedTutor.AREA},{selectedTutor.CITY}</p> */}
                </div>









                {/* <div className={styles.offertutorwrapper}> */}
                <div className={`${styles.offertutorwrapper} ${showOfferComponent ? '' : styles.hidden}`}>

                  {showOfferComponent && (


                    <div className={styles.offertutorcontainer}>


                      <h2>Offer Tutor</h2>




                      <div className={styles.offertutordetails}>


                        {/* <div className={styles.sfieldcontainer}>
                          <p className={styles.sfieldname}> Subjects :</p>
                          <p className={styles.sfieldvalue}>
                            <input
                              className={styles.offertutorsub}
                              type="text"
                              placeholder="Enter subject"
                              value={subject}
                              onChange={handleSubjectChange}
                            /> </p>
                        </div> */}
                        {/*CHANGING*/}
                        {/* <input
                   className={styles.offertutorsub}
                  type="text"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={handleSubjectChange}
                /> */}



                        <div className={styles.sfieldcontainer}>
                          <p className={styles.sfieldname}> Subjects :</p>
                          <p className={styles.sfieldvalue}> <select
                          multiple
                          className={styles.subjects}
                          value={subject}
                          onChange={(e) => setSubject(Array.from(e.target.selectedOptions, (option) => option.value))}
                        >
                          {teachingSubjects.map((teachingSubject) => (
                            <option key={teachingSubject.id} value={teachingSubject.SUBJECT_NAME}>
                              {teachingSubject.SUBJECT_NAME}
                            </option>
                          ))}
                          
                        </select> </p>
                        </div>



                        


                        <div className={styles.sfieldcontainer}>
                          <p className={styles.sfieldname}> Tuition type :</p>
                          <p className={styles.sfieldvalue}> <select value={tuitionType} onChange={handleTuitionTypeChange} className={styles.offertutortype}>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                          </select> </p>
                        </div>

                        <div className={styles.sfieldcontainer}>
                          <p className={styles.sfieldname}>Days per week :</p>
                          <p className={styles.sfieldvalue}> <select value={daysPerWeek} onChange={handleDaysPerWeekChange} className={styles.offertutordays}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>

                          </select> </p>
                        </div>

                        <div className={styles.sfieldcontainer}>
                          <p className={styles.sfieldname}> Note :</p>
                          <p className={styles.sfieldvalue}>    <textarea
                            className={styles.offertutornote}
                            placeholder="Note"
                            value={note}
                            onChange={handleNoteChange}
                          ></textarea> </p>
                        </div>

        
                      </div>







                      <div className={styles.offerbtncontainer}>

                   

                        <button className={styles.offersubmitbtn} onClick={handleSubmitOffer}>Submit</button>
                        <button className={styles.offersubmitbtn} onClick={handleCloseOffer}>Close</button>
                      </div>


                      {showConfirmation && (
                        <div className={styles.confirmationmodal}>
                          <FontAwesomeIcon  className={styles.icon} icon={faPaperPlane}/>
                          <p>{errorMessage}</p>
                          <div className={styles.confirmbtncontainer}>
                          <button className={styles.confirmbtn} onClick={handleCloseErrorMessage}>OK</button>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>


              </div>


            </div>


          )}


        </div>


      </div>

    </div >
  );


}

export default Home;
