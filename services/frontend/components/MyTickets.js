// // components/MyTickets.js
// import styles from "../styles/MyTickets.module.css";

// const MyTickets = () => {
//   const [tickets, setTickets] = useState([]);
//   return (
//     <div className={styles.container}>
//       <h1>My Tickets</h1>

//       {tickets.length > 0 ? (
//         <div className={styles.ticketList}>
//           {tickets.map((ticket) => (
//             <div key={ticket.id} className={styles.ticket}>
//               <h2 className={styles.trainName}>{ticket.trainName}</h2>
//               <div className={styles.ticketInfo}>
//                 <div className={styles.leftColumn}>
//                   <p>
//                     <strong>Destination:</strong>
//                     <br />
//                     {ticket.from} &rarr; {ticket.to}
//                   </p>
//                   <p>
//                     <strong>Date:</strong>
//                     <br />
//                     {ticket.date}
//                   </p>
//                 </div>
//                 <div className={styles.rightColumn}>
//                   <p>
//                     <strong>Class:</strong>
//                     <br />
//                     {ticket.classType}
//                   </p>
//                   <p>
//                     <strong>Seat:</strong>
//                     <br />
//                     {ticket.seatNumber}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className={styles.noTickets}>
//           <h2>No Tickets Booked Yet</h2>
//           <p>Start your journey by purchasing a ticket.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyTickets;

// // components/MyTickets.js
// import styles from "../styles/MyTickets.module.css";

// const MyTickets = () => {
//   return (
//     <div className={styles.container}>
//       <h1>My Tickets</h1>
//       <p>Here you can view your booked tickets.</p>
//       {/* Implement the logic to fetch and display user's tickets */}
//     </div>
//   );
// };

// export default MyTickets;
import { useEffect, useState } from "react";
import styles from "../styles/MyTickets.module.css";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Mock data for tickets
    const mockTickets = [
      {
        id: "1",
        trainName: "Subarna Express",
        from: "Dhaka",
        to: "Chittagong",
        date: "2024-10-25",
        classType: "AC",
        seatNumber: "A3",
      },
      {
        id: "2",
        trainName: "Turna Nishitha",
        from: "Sylhet",
        to: "Dhaka",
        date: "2024-10-26",
        classType: "Sleeper",
        seatNumber: "S12",
      },
      {
        id: "3",
        trainName: "Sonar Bangla Express",
        from: "Dhaka",
        to: "Chittagong",
        date: "2024-10-27",
        classType: "First Class",
        seatNumber: "F1",
      },
    ];

    // Simulate fetching tickets from an API
    setTimeout(() => {
      setTickets(mockTickets);
    }, 500); // Mock API delay of 500ms
  }, []);

  return (
    <div className={styles.container}>
      <h1>My Tickets</h1>

      {tickets.length > 0 ? (
        <div className={styles.ticketList}>
          {tickets.map((ticket) => (
            <div key={ticket.id} className={styles.ticket}>
              <h2 className={styles.trainName}>{ticket.trainName}</h2>
              <div className={styles.ticketInfo}>
                <div className={styles.leftColumn}>
                  <p>
                    <strong>Destination:</strong>
                    <br />
                    {ticket.from} &rarr; {ticket.to}
                  </p>
                  <p>
                    <strong>Date:</strong>
                    <br />
                    {ticket.date}
                  </p>
                </div>
                <div className={styles.rightColumn}>
                  <p>
                    <strong>Class:</strong>
                    <br />
                    {ticket.classType}
                  </p>
                  <p>
                    <strong>Seat:</strong>
                    <br />
                    {ticket.seatNumber}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noTickets}>
          <h2>No Tickets Booked Yet</h2>
          <p>Start your journey by purchasing a ticket.</p>
        </div>
      )}
    </div>
  );
};

export default MyTickets;
