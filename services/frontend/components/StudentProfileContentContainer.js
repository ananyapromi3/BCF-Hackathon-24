// components/ProfileContentContainer.js
import 'normalize.css';
import { useEffect, useState } from 'react';
import styles from "../styles/StudentProfile.module.css";
import { faSliders, faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import ProfilePictureForm from "./ProfilePictureForm";
import ShowImage from './showimage_student';

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

const ProfileContentContainer = ({ studentId }) => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedClass, setEditedClass] = useState('');
  const [editedInstitution, setEditedInstitution] = useState('');
  const [editedGender, setEditedGender] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [editedDateOfBirth, setEditedDateOfBirth] = useState('');
  const [editedArea, setEditedArea] = useState('');
  const [editedCity, setEditedCity] = useState('');
  const [editedRoad, setEditedRoad] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const studentUserId = studentId;

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch(`/api/profilecontent?studentId=${studentUserId}`);

      const data = await response.json();
      setStudentDetails(data);
      //console.log()
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleEditClick = async () => {

    setEditMode(true);
    setEditedName(studentDetails.NAME);
    setEditedEmail(studentDetails.EMAIL);
    setEditedClass(studentDetails.CLASS);
    setEditedInstitution(studentDetails.INSTITUTION);
    setEditedGender(studentDetails.GENDER);
    setEditedPhoneNumber(studentDetails.PHONE_NUMBER);
    setEditedDateOfBirth(studentDetails.DATE_OF_BIRTH);
    setEditedCity(studentDetails.CITY);
    setEditedArea(studentDetails.AREA);
    setEditedRoad(studentDetails.ROAD);
  };

  // const handleSaveClick = () => {
  //   setEditMode(false);

  //   fetchStudentDetails();
  //   setStudentDetails({
  //     ...studentDetails,
  //     NAME: editedName,
  //     EMAIL: editedEmail,
  //     CLASS: editedClass,
  //     INSTITUTION: editedInstitution,
  //     GENDER: editedGender,
  //     PHONENUMBER: editedPhoneNumber,
  //     DATEOFBIRTH: editedDateOfBirth,
  //     CITY: editedCity,
  //     AREA: editedArea,
  //     ROAD: editedRoad,
  //   });
  // };
  const handleSaveClick = async () => {
    setEditMode(false);
    const name = editedName;
    const email = editedEmail;
    const s_class = editedClass;
    const institution = editedInstitution;
    const gender = editedGender;
    const phone_number = editedPhoneNumber;
    const date_of_birth = editedDateOfBirth;
    const city = editedCity;
    const area = editedArea;
    const road = editedRoad;
    try {
      const response = await fetch('/api/editProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentUserId,
          name,
          email,
          s_class,
          institution,
          gender,
          phone_number,
          date_of_birth,
          city,
          area,
          road,
        }),
      });

      if (response.ok) {
        //console.log('Offer successfully sent!');
        // Optionally, you can clear the subject input and close the offer component
        setEditMode(false);
      } else {
        console.error('Error editing profile :', response.status);
      }
    } catch (error) {
      console.error('Error editing profile:', error);
    }
    fetchStudentDetails();
  };

  const handleBackClick = () => {
    setEditMode(false);
  };
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
      body: JSON.stringify({ image: data.secure_url, id: studentId }),
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
      const response = await fetch('/api/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
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

        {/* <div className={styles.bgimgcontainer}>
          <img className={styles.bgimg} src="/loginbg2.png" alt="Image" />
        </div> */}

        <div className={styles.studentcard}>

          <div className={styles.left}>

            <div className={styles.studentimgcontainer} >

              {showUploadForm ? (

                <div className={styles.imgeditcontainer}>

                  <h1> UPLOAD YOUR IMAGE</h1>

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
                      alt="Preview will apprear here."
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

                <ShowImage studentid={studentId} />

              )}

            </div>

            <button className={styles.changepicbtn} onClick={() => setShowUploadForm(!showUploadForm)}><FontAwesomeIcon icon={faCamera} /></button>
          </div>





          {studentDetails ? (




            <div className={styles.studentdetailswrapper}>
              <h2 className={styles.heading} >My Profile</h2>
              {editMode ? (


                <div className={styles.studentdetailsedit} >


                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Name: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedName} onChange={e => setEditedName(e.target.value)} /> </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Email: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedEmail} onChange={e => setEditedEmail(e.target.value)} /> </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Class: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedClass} onChange={e => setEditedClass(e.target.value)} /> </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Institution: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedInstitution} onChange={e => setEditedInstitution(e.target.value)} /> </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Gender: </p>
                    <p className={styles.efieldvalue}>  <input type="text" value={editedGender} onChange={e => setEditedGender(e.target.value)} /> </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Phone Number: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedPhoneNumber} onChange={e => setEditedPhoneNumber(e.target.value)} /> </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Date of Birth: </p>
                    <p className={styles.efieldvalue}> <input type="text" value={editedDateOfBirth} onChange={e => setEditedDateOfBirth(e.target.value)} /> </p>
                  </div>

                  <div className={styles.fieldcontainer}>
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



                  {/* <p>Name: <input type="text" value={editedName} onChange={e => setEditedName(e.target.value)} /></p>
                  <p>Email: <input type="text" value={editedEmail} onChange={e => setEditedEmail(e.target.value)} /></p>
                  <p>Class: <input type="text" value={editedClass} onChange={e => setEditedClass(e.target.value)} /></p>
                  <p>Institution: <input type="text" value={editedInstitution} onChange={e => setEditedInstitution(e.target.value)} /></p>
                  <p>Gender: <input type="text" value={editedGender} onChange={e => setEditedGender(e.target.value)} /></p>
                  <p>Phone Number: <input type="text" value={editedPhoneNumber} onChange={e => setEditedPhoneNumber(e.target.value)} /></p>
                  <p>Date of Birth: <input type="text" value={editedDateOfBirth} onChange={e => setEditedDateOfBirth(e.target.value)} /></p>
                  <p>Address: <input type="text" value={editedCity} onChange={e => setEditedCity(e.target.value)} /> <input type="text" value={editedArea} onChange={e => setEditedArea(e.target.value)} /> <input type="text" value={editedRoad} onChange={e => setEditedRoad(e.target.value)} /></p> */}

                  <div className={styles.editbtncontainer}>
                    <button className={styles.savebtn} onClick={handleSaveClick}>Save</button>
                    <button className={styles.backbtn} onClick={handleBackClick}>Back</button>
                  </div>


                </div>

              ) : (



                <div className={styles.studentdetailsinfo}>


                  <div className={styles.studentname}>
                    <h2>{studentDetails.NAME}</h2>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Class: </p>
                    <p className={styles.fieldvalue}> {studentDetails.CLASS} </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Institution: </p>
                    <p className={styles.fieldvalue}> {studentDetails.INSTITUTION} </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Email: </p>
                    <p className={styles.fieldvalue}> {studentDetails.EMAIL} </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Address: </p>
                    <p className={styles.fieldvalue}> {studentDetails.ROAD}, {studentDetails.AREA}, {studentDetails.CITY} </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Gender: </p>
                    {/* <p className={styles.fieldvalue}> {studentDetails.GENDER.charAt(0).toUpperCase() + studentDetails.GENDER.slice(1)} </p> */}
                    <p className={styles.fieldvalue}> {studentDetails.GENDER} </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Contact No. : </p>
                    <p className={styles.fieldvalue}> {studentDetails.PHONE_NUMBER} </p>
                  </div>

                  <div className={styles.fieldcontainer}>
                    <p className={styles.fieldname}> Date of Birth: </p>
                    <p className={styles.fieldvalue}>  {formatDate(studentDetails.DATE_OF_BIRTH)} </p>
                  </div>




                  <div className={styles.btncontainer} >

                    <button className={styles.editbtn} onClick={handleEditClick}>Edit</button>

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
                            /> </p>
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


                        {passwordChangeMessage && <p className={styles.passerrormsg}>{passwordChangeMessage}!</p>}

                      </div>



                      {/* <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />


                          <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          /> */}

                      <div className={styles.changepassbtncontainer} >

                        <button className={styles.submitbtn} onClick={handlePasswordSubmit}>Submit</button>
                        <button className={styles.closebtn} onClick={handleClosePasswordModal}>Close</button>

                      </div>





                    </div>
                  )}
                </div>
              )}
            </div>



          ) : (

            <p>Loading student details...</p>
          )}




        </div>
      </div>
    </div>
  );
};

export default ProfileContentContainer;
