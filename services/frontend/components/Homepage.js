// // components/Homepage.js
import { useState } from "react";
import BuyTickets from "./BuyTickets";
import MyTickets from "./MyTickets";
import UpdateInfo from "./UpdateInfo";
import { useRouter } from "next/router";
import styles from "../styles/Homepage.module.css";

const Homepage = () => {
  const [selectedOption, setSelectedOption] = useState("buyTickets");
  const router = useRouter();
  const renderComponent = () => {
    switch (selectedOption) {
      case "buyTickets":
        return <BuyTickets />;
      case "myTickets":
        return <MyTickets />;
      case "updateInfo":
        return <UpdateInfo />;
      default:
        return <BuyTickets />;
    }
  };
  const handleLogout = () => {
    // Perform any logout logic here (e.g., clear tokens)
    router.push("/"); // Redirect to the start page (index.js)
  };

  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <ul>
          <li
            className={selectedOption === "buyTickets" ? styles.active : ""}
            onClick={() => setSelectedOption("buyTickets")}
          >
            Buy Tickets
          </li>
          <li
            className={selectedOption === "myTickets" ? styles.active : ""}
            onClick={() => setSelectedOption("myTickets")}
          >
            My Tickets
          </li>
          <li
            className={selectedOption === "updateInfo" ? styles.active : ""}
            onClick={() => setSelectedOption("updateInfo")}
          >
            Update Info
          </li>
          <li className={styles.logout} onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>

      {/* Render the corresponding component below the navbar */}
      <div className={styles.content}>{renderComponent()}</div>
    </div>
  );
};

export default Homepage;
