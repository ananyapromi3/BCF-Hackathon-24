// pages/train/[trainId]/[cabinType].js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../../styles/CabinDetails.module.css";

const CabinDetails = () => {
  const router = useRouter();
  const userId = router.query.userId;
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

  const handleBookTicket = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    // Navigate to OTP page, passing selectedSeats via query params
    router.push({
      pathname: `/otp`,
      query: {
        userId,
        trainId,
        cabinType,
        selectedSeats: JSON.stringify(selectedSeats),
      },
    });
  };

  const handleSeatClick = async (seatNumber) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatNumber)) {
        handleCancelBooking(seatNumber);
        return prevSelected.filter((seat) => seat !== seatNumber); // Deselect seat
      } else {
        handleTempBooking(seatNumber);
        return [...prevSelected, seatNumber]; // Select seat
      }
    });
  };
  const handleTempBooking = async (seatNumber) => {
    try {
      const response = await fetch(
        `http://localhost:4003/api/trains/book-seat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trainId,
            cabinType,
            seatNumber,
          }),
        }
      );

      if (response.ok) {
        console.log("Reserved seat", seatNumber);
      } else {
        console.error("Failed to book the seat");
      }
    } catch (error) {
      console.error("Error booking the seat:", error);
    }
  };

  // i = 0;
  const handleCancelBooking = async (seatNumber) => {
    // i = 0;
    // setSelectedSeats((prevSelected) => {
    //   if (prevSelected.includes(seatNumber)) {
    //     i = 1;
    //     return prevSelected.filter((seat) => seat !== seatNumber); // Deselect seat
    //   } else {
    //     return [...prevSelected, seatNumber]; // Select seat
    //   }
    // });

    try {
      const response = await fetch(
        `http://localhost:4003/api/trains/cancel-seat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trainId,
            cabinType,
            seatNumber,
          }),
        }
      );

      if (response.ok) {
        console.log("Canceled seat", seatNumber);
      } else {
        console.error("Failed to cancel the booking");
      }
    } catch (error) {
      console.error("Error canceling the booking:", error);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  if (!trainData || !selectedCabin) {
    return <div>Loading cabin details...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        {trainData.name} - {cabinType} Cabin
      </h1>

      {/* Card for Seat Arrangement Section */}
      <div className={styles.card}>
        <div className={styles.trainLayout}>
          {/* Left section of seats */}
          <div className={styles.seatSection}>
            {selectedCabin.seats.map((seat, index) => (
              <div
                key={seat.seat_number}
                className={`${styles.seat} ${
                  seat.is_booked
                    ? styles.booked
                    : selectedSeats.includes(seat.seat_number)
                    ? styles.selected
                    : styles.available
                }`}
                onClick={() =>
                  // seat.is_booked
                  // ? handleCancelBooking(seat.seat_number)
                  // :
                  handleSeatClick(seat.seat_number)
                }
              >
                {seat.seat_number}
              </div>
            ))}
          </div>
          {/* Aisle */}
          {/* <div className={styles.aisle}></div> */}
          {/* Right section of seats */}
          {/* <div className={styles.seatSection}>
            {selectedCabin.seats.map((seat, index) => (
              <div
                key={seat.seat_number}
                className={`${styles.seat} ${
                  seat.is_booked
                    ? styles.booked
                    : selectedSeats.includes(seat.seat_number)
                    ? styles.selected
                    : styles.available
                }`}
                onClick={() =>
                  // seat.is_booked
                  // ? handleCancelBooking(seat.seat_number)
                  // :
                  handleSeatClick(seat.seat_number)
                }
              >
                {seat.seat_number}
              </div>
            ))}
          </div> */}
        </div>

        {/* Buttons at the bottom of the card */}
        <div className={styles.buttonContainer}>
          <button className={styles.bookButton} onClick={handleBookTicket}>
            Book Ticket
          </button>
          <button className={styles.backButton} onClick={handleBackClick}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CabinDetails;
