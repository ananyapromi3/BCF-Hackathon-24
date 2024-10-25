// // components/UpdateInfo.js
// import { useState, useEffect } from "react";
// import styles from "../styles/UpdateInfo.module.css";

// const UpdateInfo = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");

//   useEffect(() => {
//     // Fetch current user data and pre-fill the form
//     // This is a mock function, replace it with an actual API call
//     const fetchUserData = async () => {
//       const userData = {
//         email: "user@example.com",
//         password: "********",
//         phone: "0123456789",
//       };
//       setEmail(userData.email);
//       setPassword(userData.password);
//       setPhone(userData.phone);
//     };
//     fetchUserData();
//   }, []);

//   const handleSave = () => {
//     // Implement the logic to update user info in the database
//     console.log("Updating info with:", { email, password, phone });
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Update Info</h1>
//       <div className={styles.inputGroup}>
//         <label>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div className={styles.inputGroup}>
//         <label>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>

//       <div className={styles.inputGroup}>
//         <label>Phone</label>
//         <input
//           type="tel"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//       </div>

//       <button className={styles.button} onClick={handleSave}>
//         Save
//       </button>
//     </div>
//   );
// };

// export default UpdateInfo;
// components/UpdateInfo.js
import { useState, useEffect } from "react";
import styles from "../styles/UpdateInfo.module.css";

const UpdateInfo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Fetch current user data and pre-fill the form
    // This is a mock function, replace it with an actual API call
    const fetchUserData = async () => {
      const userData = {
        email: "user@example.com",
        password: "********",
        phone: "0123456789",
      };
      setEmail(userData.email);
      setPassword(userData.password);
      setPhone(userData.phone);
    };
    fetchUserData();
  }, []);

  const handleSave = () => {
    // Implement the logic to update user info in the database
    console.log("Updating info with:", { email, password, phone });
  };

  return (
    <div className={styles.container}>
    <div className={styles.card}>
      <h1 className={styles.title}>Update your information</h1>

      <div className={styles.inputGroup}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button className={styles.button} onClick={handleSave}>
        Save Changes
      </button>
    </div>
  </div>
  );
};

export default UpdateInfo;
