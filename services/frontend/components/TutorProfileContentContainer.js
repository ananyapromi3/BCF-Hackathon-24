import { useEffect, useState } from "react";
import Link from 'next/link';
import ShowImage from "./showImage";
import UploadForm from "./ProfilePictureForm";
import styles from "../styles/TutorProfile.module.css";
import 'normalize.css';
import { faSliders, faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth(); // Months are zero-based
  const year = date.getFullYear();

  const monthsAbbrev = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL',
    'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const formattedDate = `${day} ${monthsAbbrev[month]} ${year}`;
  return formattedDate;
}


const TutorProfileContainer = ({ tutorid }) => {
  console.log("tutorid ", tutorid)
  const [selectedOption, setSelectedOption] = useState('my-profile');
  const [tutorDetails, setTutorDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [subjects, setSubjects] = useState([]); // State to store fetched subjects
  const [selectedSubjects, setSelectedSubjects] = useState([]); // State to store selected subjects
  const [teachingSubjects, setTeachingSubjects] = useState([]);

  const [editedGender, setEditedGender] = useState('');
  const [editedDateOfBirth, setEditedDateOfBirth] = useState('');
  const [editedArea, setEditedArea] = useState('');
  const [editedCity, setEditedCity] = useState('');
  const [editedRoad, setEditedRoad] = useState('');
  const [editedInstitute, setEditedInstitute] = useState('');
  const [editedFieldOfStudy, setEditedFieldOfStudy] = useState('');
  const [editedDegree, setEditedDegree] = useState('');
  const [editedPassingYear, setEditedPassingYear] = useState('');
  const [editedAvailability, setEditedAvailability] = useState('');
  const [editedSalary, setEditedSalary] = useState('');
  const [editedYearsOfExperience, setEditedYearsOfExperience] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const tutorUserId = tutorid;

  useEffect(() => {
    fetchTutorialDetails();
  }, []);
  useEffect(() => {

    fetchSubjects();
  }, []);

  useEffect(() => {
    fetchTeachingSubjects();
  }, []);

  const fetchTeachingSubjects = async () => {
    try {
      const response = await fetch(`/api/teachingSubjects?tutorId=${tutorUserId}`); // Replace with your API endpoint
      const data = await response.json();

      console.log('data in teaching', data);

      // for(let i=0;i<data.length;i++)
      //   setTeachingSubjects(data[i]);

      setTeachingSubjects(data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchSubjects = async () => {
    try {
      const response = await fetch("/api/allsubjects"); // Replace with your API endpoint
      const data = await response.json();

      // console.log("In the component, data-> ",data);
      setSubjects(data); // Store fetched subjects in state
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTutorialDetails = async () => {
    try {

      const response = await fetch(`/api/tutorprofilecontent?tutorId=${tutorUserId}`);
      const data = await response.json();
      setTutorDetails(data);
      console.log("data", data);

    } catch (error) {
      console.log(error);
    }

  };

  const handleEdit = async () => {

    setEditMode(true);
    setEditedName(tutorDetails.NAME);
    setEditedEmail(tutorDetails.EMAIL);
    setEditedPhoneNumber(tutorDetails.PHONE_NUMBER);

    setEditedGender(tutorDetails.GENDER);
    setEditedDateOfBirth(tutorDetails.DATE_OF_BIRTH);
    setEditedArea(tutorDetails.AREA);
    setEditedCity(tutorDetails.CITY);
    setEditedRoad(tutorDetails.ROAD);
    setEditedInstitute(tutorDetails.INSTITUTE);
    setEditedFieldOfStudy(tutorDetails.FIELD_OF_STUDY);
    setEditedDegree(tutorDetails.DEGREE);
    setEditedPassingYear(tutorDetails.PASSING_YEAR);
    setEditedAvailability(tutorDetails.AVAILABILITY);
    setEditedSalary(tutorDetails.PREFERRED_SALARY);
    setEditedYearsOfExperience(tutorDetails.YEARS_OF_EXPERIENCE);
    setSelectedSubjects(teachingSubjects.map(subject => subject.SUBJECT_NAME));
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;

    if (selectedSubjects.includes(selectedSubject)) {
      setSelectedSubjects(selectedSubjects.filter((subject) => subject !== selectedSubject));
    } else {
      setSelectedSubjects([...selectedSubjects, selectedSubject]);
    }
  };



  const handleSave = async () => {
    setEditMode(false);
    const name = editedName;
    const email = editedEmail;
    const phoneNumber = editedPhoneNumber;
    const gender = editedGender;
    const dateOfBirth = editedDateOfBirth;
    const area = editedArea;
    const city = editedCity;
    const road = editedRoad;
    const institute = editedInstitute;
    const fieldOfStudy = editedFieldOfStudy;
    const degree = editedDegree;
    const passingYear = editedPassingYear;
    const availability = editedAvailability;
    const salary = editedSalary;
    const yearsOfExperience = editedYearsOfExperience;
    const preferredSubjects = selectedSubjects;

    try {
      const response = await fetch('/api/editTutorProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorUserId,
          name,
          email,
          phoneNumber,
          gender,
          dateOfBirth,
          area,
          city,
          road,
          institute,
          fieldOfStudy,
          degree,
          passingYear,
          availability,
          salary,
          yearsOfExperience,
          preferredSubjects,
        }),
      });

      if (response.ok) {
        setEditMode(false);
      }
      else {
        console.log("Error Occured");
      }
    } catch (error) {
      console.log(error);

    }
    fetchTeachingSubjects();
    fetchTutorialDetails();
  }

  const handleBack = () => {
    setEditMode(false);
  }

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "learnly_preset");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dhtogoc8c/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    console.log(data.secure_url);
    const response = await fetch("/api/upload-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: data.secure_url, id: tutorUserId }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      if (data.message == "Successful") {
        setImageSrc(data.secure_url);
        setUploadData(data);
      } else {
        console.log("Couldn't Upload!");
        setImageSrc("");
        setUploadData("");
      }
    }
    setShowUploadForm(false);
  }
  const handleChangePasswordClick = () => {
    setShowChangePasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setShowChangePasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setPasswordChangeMessage('');
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await fetch('/api/changePasswordTutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorid,
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message == 'changed') {
          setPasswordChangeMessage('Password changed');
          setCurrentPassword('');
          setNewPassword('');
          // setShowChangePasswordModal(false);
        } else {
          setPasswordChangeMessage('Current password is incorrect');
          setCurrentPassword('');
          setNewPassword('');
        }
      } else {
        console.error('Error changing password:', response.status);
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };
  console.log("teaching subjects -- ", teachingSubjects);

  return (
    <div className={styles.container}>

      <div className={styles.wrapper}>

        <div className={styles.colorcard}>
          <div className={styles.cardcontent}></div>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
          <div className={styles.blob}></div>
        </div>




        <div className={styles.bgimgcontainer}>
          {/* <img className={styles.bgimg} src="/loginbg2.png" alt="Image" /> */}
        </div>



        <div className={styles.tutorcard}>

          {/* <div className={styles.tutorcardoutline}></div> */}

          <div className={styles.left}>

            <div className={styles.tutorimgcontainer} >

              {showUploadForm ? (

                <div className={styles.imgeditcontainer}>

                  <h1>UPLOAD YOUR IMAGE</h1>

                  <form
                    className={styles.uploadform}
                    method="post"
                    onChange={handleOnChange}
                    onSubmit={handleOnSubmit}>

                    <p>
                      <label className={styles.choosefilelabel}>
                        <input className={styles.choosefile} type="file" name="file" />
                        Choose File
                      </label>
                    </p>

                    <img
                      src={imageSrc}
                      alt="Preview will appear here."
                      className={styles.previewimg}
                    />

                    {imageSrc && !uploadData && (
                      <p>
                        <button className={styles.uploadbtn}>Upload Files</button>
                      </p>
                    )}

                    {uploadData && <p> Uploaded Successfully! </p>}
                  </form>
                </div>
              ) : (

                <ShowImage tutorid={tutorUserId} />

              )}


            </div>

            {/* <div className={styles.tutorname}>
            <p>{tutorDetails.NAME}</p>
          </div> */}


            <button className={styles.changepicbtn} onClick={() => setShowUploadForm(!showUploadForm)}><FontAwesomeIcon icon={faCamera} /></button>
          </div>



          {tutorDetails ? (




            <div className={styles.tutordetailswrapper}>
              <h2 className={styles.heading}>My Profile</h2>
              {editMode ? (

                <div className={styles.tutordetailsedit}>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Name: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedName} onChange={e => setEditedName(e.target.value)} /> </p>
                  </div>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Email: </p>
                    <p className={styles.efieldvalue}><input type="text" value={editedEmail} onChange={e => setEditedEmail(e.target.value)} /></p>
                  </div>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Gender: </p>
                    <p className={styles.efieldvalue}><input type="text" value={editedGender} onChange={e => setEditedGender(e.target.value)} /></p>
                  </div>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Contact No.: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedPhoneNumber} onChange={e => setEditedPhoneNumber(e.target.value)} /> </p>
                  </div>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Date of Birth: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedDateOfBirth} onChange={e => setEditedDateOfBirth(e.target.value)} /> </p>
                  </div>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Address: </p>
                    <p className={styles.addressfieldvalue}>
                      <input
                        className={styles.inputcity}
                        type="text"
                        value={editedCity}
                        onChange={e => setEditedCity(e.target.value)} />
                      <input
                        className={styles.inputarea}
                        type="text"
                        value={editedArea}
                        onChange={e => setEditedArea(e.target.value)} />
                      <input
                        className={styles.inputroad}
                        type="text"
                        value={editedRoad}
                        onChange={e => setEditedRoad(e.target.value)} /> </p>
                  </div>






                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Expertise in Subjects: </p>
                    <p className={styles.efieldvalue}>
                      <select
                        multiple
                        className={styles.subjects}
                        value={selectedSubjects}
                        onChange={(e) => setSelectedSubjects(Array.from(e.target.selectedOptions, (option) => option.value))}
                      >
                        {subjects.map((subject) => (
                          <option key={subject.id} value={subject.NAME}>
                            {subject.NAME}
                          </option>
                        ))}
                      </select> </p>
                  </div>



                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Institution: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedInstitute} onChange={e => setEditedInstitute(e.target.value)} /> </p>
                  </div>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Field of Study: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedFieldOfStudy} onChange={e => setEditedFieldOfStudy(e.target.value)} /> </p>
                  </div>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Degree: </p>
                    <p className={styles.fieldvalue}>  <input type="text" value={editedDegree} onChange={e => setEditedDegree(e.target.value)} />  </p>
                  </div>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Passing Year: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedPassingYear} onChange={e => setEditedPassingYear(e.target.value)} />  </p>
                  </div>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Availability: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedAvailability} onChange={e => setEditedAvailability(e.target.value)} /> </p>
                  </div>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Preferred Salary: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedSalary} onChange={e => setEditedSalary(e.target.value)} /> </p>
                  </div>

                  <div className={styles.efieldcontainer}>
                    <p className={styles.fieldname}> Years of Experience: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedYearsOfExperience} onChange={e => setEditedYearsOfExperience(e.target.value)} /> </p>
                  </div>



                  {/* <p>Name: <input type="text" value={editedName} onChange={e => setEditedName(e.target.value)} /></p>
                <p>Email: <input type="text" value={editedEmail} onChange={e => setEditedEmail(e.target.value)} /></p>
                <p>Gender: <input type="text" value={editedGender} onChange={e => setEditedGender(e.target.value)} /></p>
                <p>Contact No.: <input type="text" value={editedPhoneNumber} onChange={e => setEditedPhoneNumber(e.target.value)} /></p>
                <p>Date of Birth: <input type="text" value={editedDateOfBirth} onChange={e => setEditedDateOfBirth(e.target.value)} /></p>
                <p>Address: <input type="text" value={editedCity} onChange={e => setEditedCity(e.target.value)} /> <input type="text" value={editedArea} onChange={e => setEditedArea(e.target.value)} /> <input type="text" value={editedRoad} onChange={e => setEditedRoad(e.target.value)} /></p>
                <p>Institution: <input type="text" value={editedInstitute} onChange={e => setEditedInstitute(e.target.value)} /> </p>
                <p> Field of Study: <input type="text" value={editedFieldOfStudy} onChange={e => setEditedFieldOfStudy(e.target.value)} /> </p>
                <p> Degree: <input type="text" value={editedDegree} onChange={e => setEditedDegree(e.target.value)} /> </p>
                <p> Passing Year: <input type="text" value={editedPassingYear} onChange={e => setEditedPassingYear(e.target.value)} /> </p>
                <p> Availability: <input type="text" value={editedAvailability} onChange={e => setEditedAvailability(e.target.value)} /> </p>
                <p> Preferred Salary: <input type="text" value={editedSalary} onChange={e => setEditedSalary(e.target.value)} /> </p>
                <p> Years of Experience: <input type="text" value={editedYearsOfExperience} onChange={e => setEditedYearsOfExperience(e.target.value)} /> </p> */}

                  <div className={styles.editbtncontainer}>
                    <button className={styles.savebtn} onClick={handleSave}>Save</button>
                    <button className={styles.backbtn} onClick={handleBack}>Back</button>
                  </div>


                </div>

              ) : (

                <div className={styles.tutordetailsinfo}>

                  <div className={styles.tutorname}>
                    <h2>{tutorDetails.NAME}</h2>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Email: </p>
                    <p className={styles.fieldvalue}>{tutorDetails.EMAIL}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Gender: </p>
                    <p className={styles.fieldvalue}>{tutorDetails.GENDER}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Contact.No: </p>
                    <p className={styles.fieldvalue}>{tutorDetails.PHONE_NUMBER}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Date of Birth: </p>
                    <p className={styles.fieldvalue}> {formatDate(tutorDetails.DATE_OF_BIRTH)}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Address: </p>
                    <p className={styles.fieldvalue}>{tutorDetails.ROAD}, {tutorDetails.AREA}, {tutorDetails.CITY}</p>
                  </div>



                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Expertise in Subjects: </p>
                    <p className={styles.institution}>{teachingSubjects.map(subject => subject.SUBJECT_NAME).join(', ')}</p>
                  </div>


                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Institution: </p>
                    <p className={styles.institution}>{tutorDetails.INSTITUTE}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Field of Study: </p>
                    <p className={styles.fieldvalue}>{tutorDetails.FIELD_OF_STUDY}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Degree: </p>
                    <p className={styles.fieldvalue}>{tutorDetails.DEGREE}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Passing Year: </p>
                    <p className={styles.fieldvalue}>{tutorDetails.PASSING_YEAR}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Availability: </p>
                    <p className={styles.fieldvalue}>{tutorDetails.AVAILABILITY}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Preferred Salary: </p>
                    <p className={styles.fieldvalue}>Tk {tutorDetails.PREFERRED_SALARY}</p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Years of Experience: </p>
                    <p className={styles.fieldvalue}>{tutorDetails.YEARS_OF_EXPERIENCE}</p>
                  </div>





                  {/* <p>Name: {tutorDetails.NAME}</p>
                <p>Email: {tutorDetails.EMAIL}</p>
                <p>Gender: {tutorDetails.GENDER}</p>
                <p>Contact.No: {tutorDetails.PHONE_NUMBER}</p>
                <p>Date of Birth:  {formatDate(tutorDetails.DATE_OF_BIRTH)}</p>
                <p>Address: {tutorDetails.ROAD},{tutorDetails.AREA},{tutorDetails.CITY}</p>
                <p>Institution: {tutorDetails.INSTITUTE}</p>
                <p>Field of Study: {tutorDetails.FIELD_OF_STUDY}</p>
                <p>Degree: {tutorDetails.DEGREE}</p>
                <p>Passing Year: {tutorDetails.PASSING_YEAR}</p>
                <p>Availability: {tutorDetails.AVAILABILITY}</p>
                <p>Preferred Salary: {tutorDetails.PREFERRED_SALARY}</p>
                <p>Years of Experience: {tutorDetails.YEARS_OF_EXPERIENCE}</p> */}

                  <div className={styles.btncontainer} >

                    <button className={styles.editbtn} onClick={handleEdit}>Edit</button>


                    <button className={styles.changepassbtn} onClick={handleChangePasswordClick}>Change Password</button>

                  </div>

                  {showChangePasswordModal && (

                    <div className={styles.changepasswordmodal}>

                      <h2>Change Password</h2>

                      <div className={styles.changepasswordcontainer}>

                        <div className={styles.fieldcontainer}>
                          <p className={styles.fieldname}>Current Password : </p>
                          <p className={styles.efieldvalue}>
                            <input
                              type="password"
                              placeholder="Current Password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                            /></p>
                        </div>


                        <div className={styles.fieldcontainer}>
                          <p className={styles.fieldname}>New Password : </p>
                          <p className={styles.efieldvalue}>
                            <input
                              type="password"
                              placeholder="New Password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            /></p>

                          

                        </div>


                        {passwordChangeMessage && <p className={styles.passerrormsg}>{passwordChangeMessage}</p>}

                        </div>

                        <div className={styles.changepassbtncontainer} >
                          <button className={styles.submitbtn} onClick={handlePasswordSubmit}>Submit</button>
                          <button  className={styles.closebtn} onClick={handleClosePasswordModal}>Close</button>
                        </div>

                      

                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p>Loading Tutor details...</p>
          )}


        </div>



      </div>

    </div>

  );
};

export default TutorProfileContainer;










