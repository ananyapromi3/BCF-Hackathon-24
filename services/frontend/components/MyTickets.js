// components/MyTickets.js
import styles from "../styles/MyTickets.module.css";

const MyTickets = () => {
  return (
    <div className={styles.container}>
      <h1>My Tickets</h1>
      <p>Here you can view your booked tickets.</p>
      {/* Implement the logic to fetch and display user's tickets */}
    </div>
  );
};

export default MyTickets;
