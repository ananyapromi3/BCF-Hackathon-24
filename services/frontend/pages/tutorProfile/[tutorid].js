import React, { useEffect, useState } from "react";
import Link from "next/link";
import "normalize.css";

import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
// import TutorMenuContainer from '../../components/TutorMenuContainer';
// import TutorContentContainer from '../../components/TutorContentContainer';
const jwt = require("jsonwebtoken");

const tutorProfile = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedOption, setSelectedOption] = useState("my-profile");
  const [notificationsCount, setNotificationsCount] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const id = router.query.tutorid;

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
      console.error("Error fetching notifications count:", error);
    }
  };

  return (
    <div className={styles.totalcontainer}>
      <div className={styles.menucontainer}>
        {/* <TutorMenuContainer
                //selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
                notificationsCount={notificationsCount}
            /> */}
      </div>
      {/* <TutorMenuContainer onSelectOption={handleSelectOption} /> */}
      <div className={styles.componentcontainer}>
        {/* <TutorContentContainer selectedOption={selectedOption} tutorid={id}/> */}
      </div>
    </div>
  );
};

export default tutorProfile;
