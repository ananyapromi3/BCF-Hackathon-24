// components/BuyTickets.js
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/BuyTickets.module.css";

const BuyTickets = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [trains, setTrains] = useState([]); // Holds the fetched trains
  const router = useRouter();
  const userId = router.query.userId;

  const districts = [
    "Bagerhat",
    "Bandarban",
    "Barguna",
    "Barisal",
    "Bhola",
    "Bogra",
    "Brahmanbaria",
    "Chandpur",
    "Chapai Nawabganj",
    "Chittagong",
    "Chuadanga",
    "Cox's Bazar",
    "Cumilla",
    "Dhaka",
    "Dinajpur",
    "Faridpur",
    "Feni",
    "Gaibandha",
    "Gopalganj",
    "Habiganj",
    "Jamalpur",
    "Jashore",
    "Jhalokati",
    "Jhenaidah",
    "Joypurhat",
    "Khagrachari",
    "Khulna",
    "Kishoreganj",
    "Kurigram",
    "Kushtia",
    "Lakshmipur",
    "Lalmonirhat",
    "Magura",
    "Manikganj",
    "Meherpur",
    "Moulvibazar",
    "Munshiganj",
    "Mymensingh",
    "Naogaon",
    "Narail",
    "Narayanganj",
    "Narsingdi",
    "Netrakona",
    "Nikhil",
    "Nilphamari",
    "Noakhali",
    "Pabna",
    "Panchagarh",
    "Patuakhali",
    "Pirojpur",
    "Rajbari",
    "Rajshahi",
    "Rangamati",
    "Rangpur",
    "Satkhira",
    "Shariatpur",
    "Sherpur",
    "Sirajganj",
    "Sunamganj",
    "Sylhet",
    "Tangail",
  ];

  const handleSubmit = async () => {
    if (from && to && date) {
      console.log("from:", from);
      console.log("to:", to);
      console.log("date:", date);
      try {
        const response = await fetch(
          "http://localhost:4003/api/trains/search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ from, to, date }),
          }
        );
        console.log("response:", response);

        if (!response.ok) {
          // throw new Error("Network response was not ok");
          console.log("No trains found!");
          alert("No trains found!");
          // router.push(`/users/${id}`);
        } else {
          const data = await response.json();
          setTrains(data); // Set fetched trains in the state
          // Optionally, redirect to a different page with fetched data
          router.push({
            pathname: "/trains",
            query: { userId, from, to, date, trains: JSON.stringify(data) },
          });
          console.log("data:", data);
        }
      } catch (error) {
        console.error("Error fetching trains:", error);
      }
    } else {
      alert("Please select all fields!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Buy Tickets</h1>
        <h2 className={styles.body}>
          Choose your destination, pick a date, and travel with ease
        </h2>

        <div className={styles.destinationbox}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>From</label>
            <select
              className={styles.select}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              <option value="">Select Departure Station</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>To</label>
            <select
              className={styles.select}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              <option value="">Select Destination Station</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={`${styles.inputGroup} ${styles.dateGroup}`}>
          <label className={styles.label}>Date</label>
          <input
            className={styles.input}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max={
              new Date(new Date().setDate(new Date().getDate() + 10))
                .toISOString()
                .split("T")[0]
            }
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          Search Trains
        </button>
      </div>
    </div>
  );
};

export default BuyTickets;
