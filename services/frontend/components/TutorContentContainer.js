import React from "react";
// import styles from "../styles/TutorContent.module.css";
// import TuitionPosts from "./TuitionPostsComponent";
// import TutorProfile from "./TutorProfileContentContainer";
// import BatchesContainer from "./TutorBatchesComponent";
// import TuitionContainer from "./TutorTuitionContainer";

import styles from "../styles/TutorContent.module.css";
import TuitionPosts from "./TuitionPostsComponent";
import TutorProfile from "./TutorProfileContentContainer";
import BatchesContainer from "./TutorBatchesComponent";
import TuitionContainer from "./TutorTuitionContainer";
import DemoLectures from "./demo";
import MyOffers from "./TutorOffersContainer";
import AppliedTuitionPostsContainer from "./TutorAppliedPosts";
import Notifications from './Notifications'

import 'normalize.css';



const TutorContentContainer = ({ selectedOption, tutorid }) => {
  let content;
  

  switch (selectedOption) {
    case "available-tuition":
      //content = <div>Tutors Content</div>;
      return (
        <div>
          <TuitionPosts tutorid={tutorid} />
        </div>
      );
      break;
    case "my-profile":
      //content = <div>My Profile Content</div>;
      return <div> 
       
        <TutorProfile tutorid={tutorid}/>
      </div>;
      // <ProfileContentContainer/>
      break;
    case "my-tuitions":
      //content = <div>Tutors Content</div>;
      return (
        <div>
          <TuitionContainer tutorid={tutorid}/>
          
          </div>
      );
      break;
    case "offers":
      //content = <div>Tutors Content</div>;
      return <div>
        <MyOffers tutorid={tutorid}/>
        </div>;
      break;
    case "batches":
      //content = <div>Tutors Content</div>;
      return  <div> 
      <BatchesContainer tutorid={tutorid}/>
    </div>;
      break;
    case "demo-lectures":
      //content = <div>Tutors Content</div>;
      return <div>
        <DemoLectures tutorid={tutorid}/>
        </div>
        ;
      break;
    case "applied-tuition":
      //content = <div>Tutors Content</div>;
      return (
        <div>
          <AppliedTuitionPostsContainer tutorid={tutorid} />
        </div>
      );
      break;
      case 'notifications':
        //content = <div>Tutors Content</div>;
      return <div ><Notifications studentId={tutorid}/></div>;
      break;
    
    default:
      //content = <div>Default Content</div>;
      return <div className={styles.contentcontainer}>default content</div>;
  }

  // return <div className={styles.contentcontainer}>{content}</div>;
};

export default TutorContentContainer;
