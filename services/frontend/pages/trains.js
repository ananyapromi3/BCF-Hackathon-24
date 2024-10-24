// pages/trains.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/Trains.module.css";

const Trains = () => {
  const router = useRouter();
  const { from, to, date, trains } = router.query; // Retrieve train data from router query

  const [fetchedTrains, setFetchedTrains] = useState([]);

  useEffect(() => {
    if (trains) {
      setFetchedTrains(JSON.parse(trains)); // Parse the trains data passed via router
    } else {
      // Option 2: Retrieve data from localStorage if needed
      // const storedTrains = localStorage.getItem("trainSearchResults");
      // if (storedTrains) {
      //   setFetchedTrains(JSON.parse(storedTrains));
      // }
    }
  }, [trains]);

  const handleBack = () => {
    router.push("/homepage");
  };

  const handleCabinClick = (trainId, cabinType) => {
    router.push(`/train/${trainId}/${cabinType}`);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        Back
      </button>

      <h1>Available Trains</h1>

      {fetchedTrains.length > 0 ? (
        fetchedTrains.map((train) => (
          <div key={train._id} className={styles.train}>
            <h2>{train.train_name}</h2>
            <p>From: {train.route.from}</p>
            <p>To: {train.route.to}</p>
            <p>Date: {train.date}</p>
            <h3>Cabins Available:</h3>
            {train.cabins.map((cabin, index) => (
              <div key={index} className={styles.cabin}>
                <p>
                  {cabin.cabin_type}:{" "}
                  {cabin.seats.filter((seat) => !seat.is_booked).length}{" "}
                  available seats
                </p>
                <button
                  className={styles.button}
                  onClick={() => handleCabinClick(train._id, cabin.cabin_type)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No trains available for the selected route and date.</p>
      )}
    </div>
  );
};

export default Trains;
