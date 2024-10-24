import React, { useEffect, useState } from 'react';
import 'normalize.css';
// import MenuContainer from '@/components/StudentMenuContainer.js';
// import ContentContainer from '@/components/StudentContentContainer';
import styles from "@/styles/Profile.module.css";
import { useRouter } from 'next/router';
const jwt = require('jsonwebtoken');

const StudentProfile = () => {
  const [selectedOption, setSelectedOption] = useState('home');
  const router=useRouter();
  const id=router.query.studentid;
  const [notificationsCount, setNotificationsCount] = useState(0);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("http://localhost:3000");
    return;
  }

  try {
    const decodedToken = jwt.verify(token, "abc");
    const userIdInToken = decodedToken.userId;

    if (userIdInToken !== parseInt(id)) {
      router.push("http://localhost:3000");
    }
  } catch (error) {
    router.push("http://localhost:3000");
  }
  fetchNotificationsCount();
  const interval = setInterval(fetchNotificationsCount, 10000);

  return () => {
    clearInterval(interval);
};
}, []);

const fetchNotificationsCount = async () => {
  try {
      const response = await fetch(`/api/getNotificationsCount?userId=${id}`);
      const data = await response.json();
      //console.log(parseInt(data.COUNT));
      setNotificationsCount(parseInt(data.count));
  } catch (error) {
      console.error('Error fetching notifications count:', error);
  }
};

  return (
    <div className={styles.totalcontainer}>

      <div className={styles.menucontainer}>
        {/* <MenuContainer onSelectOption={handleSelectOption} /> */}
        {/* <MenuContainer
                //selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
                notificationsCount={notificationsCount}
            /> */}
      </div>
      

      <div className={styles.componentcontainer}>
        {/* <ContentContainer selectedOption={selectedOption} studentId={id} /> */}
      </div>
      
    </div>
  );
};

export default StudentProfile;

