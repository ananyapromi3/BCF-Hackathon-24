import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../../styles/CabinDetails.module.css";

const CabinDetails = () => {
  const router = useRouter();
  const { trainId, cabinType } = router.query;

  const [trainData, setTrainData] = useState(null);
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (trainId && cabinType) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:4003/api/trains/show/${trainId}`
          );
          const data = await response.json();

          if (response.ok) {
            setTrainData(data);

            // Find the specific cabin type in the fetched train data
            const cabin = data.cabins.find((c) => c.cabin_type === cabinType);
            if (cabin) {
              setSelectedCabin(cabin);
            } else {
              console.error("Cabin type not found");
            }
          } else {
            console.error("Error fetching train data");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [trainId, cabinType]);

  const handleSeatClick = async (seatNumber) => {
    try {
      const response = await fetch(
        `http://localhost:4003/api/trains/cancel-seat/${trainId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cabinType,
            seat: seatNumber,
            is_booked: false, // Mark seat as not booked
          }),
        }
      );

      if (response.ok) {
        const isSeatSelected = selectedSeats.includes(seatNumber);

        if (isSeatSelected) {
          setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
          setSelectedSeats([...selectedSeats, seatNumber]);
        }
        // alert(`Seat ${seatNumber} booking canceled!`);
        // setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber)); // Remove seat from selected
        // Optionally fetch updated seat data if needed
      } else {
        console.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const handleBookTicket = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    // Navigate to OTP page, passing selectedSeats via query params
    router.push({
      pathname: `/otp`,
      query: {
        trainId,
        cabinType,
        selectedSeats: JSON.stringify(selectedSeats),
      },
    });
  };

  // const handleBookTicket = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:4003/api/trains/book-seats/${trainId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           cabinType,
  //           seats: selectedSeats,
  //           is_booked: true, // Mark seats as booked
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       alert("Seats successfully booked!");
  //       // Optionally, refresh or update the local state to show booked seats
  //       setSelectedSeats([]); // Reset selected seats after booking
  //       // Optionally fetch updated seat data if needed
  //     } else {
  //       console.error("Failed to book seats");
  //     }
  //   } catch (error) {
  //     console.error("Error booking seats:", error);
  //   }
  // };

  const handleCancelBooking = async (seatNumber) => {
    try {
      const response = await fetch(
        `http://localhost:4003/api/trains/cancel-seat/${trainId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cabinType,
            seat: seatNumber,
            is_booked: false, // Mark seat as not booked
          }),
        }
      );

      if (response.ok) {
        // alert(`Seat ${seatNumber} booking canceled!`);
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber)); // Remove seat from selected
        // Optionally fetch updated seat data if needed
      } else {
        console.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  if (!trainData || !selectedCabin) {
    return <div>Loading cabin details...</div>;
  }

  const seatArrangement = Array.from(
    { length: selectedCabin.seats.length },
    (_, i) => i + 1
  );

  return (
    <div className={styles.container}>
      <h1>
        {trainData.train_name} - {cabinType} Cabin
      </h1>

      <div className={styles.seats}>
        {seatArrangement.map((seatNumber) => (
          <div
            key={seatNumber}
            className={`${styles.seat} ${
              selectedCabin.seats[seatNumber - 1].is_booked
                ? styles.booked
                : selectedSeats.includes(seatNumber)
                ? styles.selected
                : styles.available
            }`}
            onClick={() =>
              selectedCabin.seats[seatNumber - 1].is_booked
                ? handleCancelBooking(seatNumber)
                : handleSeatClick(seatNumber)
            }
          >
            {seatNumber}
          </div>
        ))}
      </div>

      <button className={styles.bookButton} onClick={handleBookTicket}>
        Book Selected Seats
      </button>

      <button className={styles.backButton} onClick={handleBackClick}>
        Back
      </button>
    </div>
  );
};

export default CabinDetails;
