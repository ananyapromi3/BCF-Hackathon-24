import React, { useEffect } from 'react';
import styles from "../styles/Content.module.css";
import ProfileContentContainer from './StudentProfileContentContainer';
import StudentHome from './StudentHome';
import EnrolledBatches from './EnrolledBatches';
import AllBatches from './AllBatches';
import CreateTuitionPost from './CreatTuitionPost';
import DemoLectures from './demo_student';
import MyOffers from './MyoffersStudent';
import MyTutorContainer from './MyTutorContainer';
import MyRequests from './MyRequests';
import { useRouter } from 'next/router';
import Notifications from './Notifications'
import jwt from 'jsonwebtoken';
const ContentContainer = ({ selectedOption,studentId }) => {
  let content;
  //console.log(studentId);
  const router=useRouter();

 

  switch (selectedOption) {
    case 'home':
      //content = <div>Tutors Content</div>;
      return <div><StudentHome studentId={studentId}/></div>;
      break;
    case 'my-profile':
      //content = <div>My Profile Content</div>;
      return <div><ProfileContentContainer studentId={studentId}/></div>;
      // <ProfileContentContainer/>
      break;
    case 'my-tutors':
      //content = <div>Tutors Content</div>;
      return <div ><MyTutorContainer studentId={studentId}/></div>;
      break;
    case 'enrolled-batches':
        //content = <div>Tutors Content</div>;
      return <div><EnrolledBatches studentId={studentId}/></div>;
      break;
    case 'all-batches' :
      return <div><AllBatches studentId={studentId}/></div>;
      break;
    case 'post-request':
        //content = <div>Tutors Content</div>;
      return <div><CreateTuitionPost studentId={studentId}/></div>;
      break;
      case 'handle-offer':
        //content = <div>Tutors Content</div>;
      return <div ><MyOffers studentId={studentId} /></div>;
      break;
    case 'handle-request':
        //content = <div>Tutors Content</div>;
      return <div><MyRequests studentId={studentId} /></div>;
      break;
    case 'demo-lectures':
        //content = <div>Tutors Content</div>;
      return <div ><DemoLectures/></div>;
      break;
      case 'notifications':
        //content = <div>Tutors Content</div>;
      return <div ><Notifications studentId={studentId}/></div>;
      break;
    default:
      //content = <div>Default Content</div>;
      return <div className={styles.contentcontainer}>default contect</div>;
  }

 // return <div className={styles.contentcontainer}>{content}</div>;
};

export default ContentContainer;
