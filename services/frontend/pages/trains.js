// pages/trains.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/Trains.module.css";

const Trains = () => {
  const router = useRouter();
  const { userId, from, to, date, trains } = router.query; // Retrieve train data from router query
  console.log("Trains data:", trains);

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
    // router.push("/homepage");
    router.push({
      pathname: "/homepage",
      query: { userId },
    });
  };

  const handleCabinClick = (trainId, cabinType) => {
    // router.push(`/train/${trainId}/${cabinType}`);
    router.push({
      pathname: `/train/${trainId}/${cabinType}`,
      query: { userId },
    });
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        Back
      </button>

      <h1 className={styles.heading}>Available Trains</h1>
      <p className={styles.selectedDate}>Selected Date: {date}</p>

      {fetchedTrains.length > 0 ? (
        fetchedTrains.map((train) => (
          <div key={train._id} className={styles.train}>
            <div className={styles.trainContent}>
              {/* Train main details */}
              <div className={styles.trainMain}>
                <h2 className={styles.trainName}>{train.train_name}</h2>

                {/* Departure and Arrival section */}
                <div className={styles.trainSchedule}>
                  <div className={styles.scheduleHeader}>
                    <span className={styles.scheduleLabel}>Departure</span>
                    <span className={styles.scheduleLabel}>Arrival</span>
                  </div>

                  <div className={styles.scheduleDetails}>
                    <span className={styles.city}>{train.route.from}</span>
                    <span className={styles.arrow}>
                      ----------------------&gt;
                    </span>
                    <span className={styles.city}>{train.route.to}</span>
                  </div>

                  <div className={styles.timeDetails}>
                    <span className={styles.time}>{train.departure_time}</span>
                    <span className={styles.time}>{train.arrival_time}</span>
                  </div>
                </div>
              </div>

              {/* Cabin cards section */}
              <div className={styles.trainCabins}>
                {train.cabins.map((cabin, index) => (
                  <div key={index} className={styles.cabinCard}>
                    <p className={styles.cabinType}>{cabin.cabin_type} Cabin</p>
                    <p className={styles.seatInfo}>
                      {cabin.seats.filter((seat) => !seat.is_booked).length}/
                      {cabin.total_seats} seats available
                    </p>
                    {cabin.fare[cabin.cabin_type] ? (
                      <p className={styles.cabinFare}>
                        <span className={styles.fareLabel}>Fare:</span>{" "}
                        {cabin.fare[cabin.cabin_type]} BDT
                      </p>
                    ) : (
                      <p className={styles.cabinFare}>Fare not available</p>
                    )}
                    <button
                      className={styles.bookButton}
                      onClick={() =>
                        handleCabinClick(train._id, cabin.cabin_type)
                      }
                    >
                      View Cabin
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noTrains}>
          No trains available for the selected route and date.
        </p>
      )}
    </div>
  );
};

export default Trains;
