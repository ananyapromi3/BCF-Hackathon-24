import React, { useEffect, useState } from "react";
import "normalize.css";
// import MenuContainer from "@/components/StudentMenuContainer.js";
// import ContentContainer from "@/components/StudentContentContainer";
// import styles from "@/styles/Profile.module.css";
import Homepage from "../../components/Homepage";
import { useRouter } from "next/router";
const jwt = require("jsonwebtoken");

const UserProfile = () => {
  //   const [selectedOption, setSelectedOption] = useState('home');
  const router = useRouter();
  const id = router.query.userId;
  console.log(id);
  //   const [notificationsCount, setNotificationsCount] = useState(0);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      //   router.push("http://localhost:4000/login");
      return;
    }

    try {
      const decodedToken = jwt.verify(token, "abc");
      console.log(decodedToken);
      const userIdInToken = decodedToken.userId;
      console.log("userIdInToken:", userIdInToken);
      console.log("id:", id);

      if (userIdInToken !== id) {
        console.log("User id in token does not match");
        router.push("http://localhost:4000/login");
      }
    } catch (error) {
      console.log(error);
      console.log("Error decoding token");
      router.push("http://localhost:4000/login");
    }
    //   fetchNotificationsCount();
    //   const interval = setInterval(fetchNotificationsCount, 10000);

    return () => {
      // clearInterval(interval);
    };
  }, []);

  // const fetchNotificationsCount = async () => {
  //   try {
  //       const response = await fetch(`/api/getNotificationsCount?userId=${id}`);
  //       const data = await response.json();
  //       //console.log(parseInt(data.COUNT));
  //       setNotificationsCount(parseInt(data.count));
  //   } catch (error) {
  //       console.error('Error fetching notifications count:', error);
  //   }
  // };

  return <Homepage />;
};

export default UserProfile;
