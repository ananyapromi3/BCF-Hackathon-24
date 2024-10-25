import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/OtpPage.module.css";

const OtpPage = () => {
  const router = useRouter();
  const { userId, trainId, cabinType, selectedSeats } = router.query; // Extract userId and selectedSeats from query parameters
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [email, setEmail] = useState(""); // State to hold user's email
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer when component unmounts
  }, []);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:4002/users/lookup/${userId}`
          );
          if (response.ok) {
            const data = await response.json();
            console.log("data:", data);
            setEmail(data.data.email); // Set the user's email
            generateOTP(data.data.email); // Call generateOTP with the fetched email
          } else {
            alert("Failed to fetch user data.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const generateOTP = async (email) => {
    try {
      const response = await fetch("http://localhost:4005/api/otp/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send the user's email
      });

      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent to your email.");
      } else {
        alert("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error generating OTP:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:4005/api/otp/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }), // Validate OTP using email and entered OTP
      });

      const result = await response.json();

      if (response.ok) {
        alert("OTP validated successfully.");
        // Navigate to the make payment page
        router.push({
          pathname: "/makepayment",
          query: {
            userId,
            trainId,
            cabinType,
            selectedSeats: JSON.stringify(selectedSeats),
          },
        });
      } else {
        alert(result.message || "Invalid OTP, please try again.");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (timeLeft === 0) {
    return <div>OTP expired, please try again.</div>;
  }

  return (
    <div className={styles.container}>
      <h1>OTP Verification</h1>
      <p>Your selected seats: {selectedSeats}</p>
      <p>Enter the OTP sent to your email ({email}):</p>
      <input
        className={styles.otpInput}
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button className={styles.submitButton} onClick={handleSubmit}>
        Submit OTP
      </button>

      <p>Time remaining: {formatTime()}</p>
    </div>
  );
};

export default OtpPage;
