import "normalize.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Signup.module.css";
import {
  faGraduationCap,
  faPersonChalkboard,
  faEnvelope,
  faEyeSlash,
  faEye,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("student"); // Default role is student
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:4002/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse the JSON data from the response
        if (data.message == "User registered successfully") {
          setErrorMessage("");
          router.push("/login");
          console.log("Signup successful!");
        } else {
          setErrorMessage("Invalid Signup!");
          setEmail(""); // Clear the email input field
          setPassword(""); // Clear the password input field
          setName("");
          console.error("signup failed.");
        }
        ///console.log(data.message); // Display the success message
      } else {
        setErrorMessage("Invalid Signup!");
        setEmail(""); // Clear the email input field
        setPassword(""); // Clear the password input field
        setName("");
        console.error("Signup failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.learnlyimg}>
          <img src="/LogoWhitebg.png" alt="Image" />
        </div>

        <div className={styles.right}>
          <span className={styles.span}> </span>

          <div className={styles.title}>
            <h1>SIGNUP</h1>
            <br />
            {/* <p>Please select your role</p> */}
          </div>

          {/* <div className={styles.radiocon}>
            <div className={styles.radio_tile_group}>
              <div className={styles.input_container}>
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={() => setRole("student")}
                />
                <div className={styles.radio_tile}>
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className={styles.studico}
                  />

                  <label for="student">Student</label>
                </div>
              </div>

              <div className={styles.input_container}>
                <input
                  type="radio"
                  id="tutor"
                  name="role"
                  value="teacher"
                  checked={role === "teacher"}
                  onChange={() => setRole("teacher")}
                />
                <div className={styles.radio_tile}>
                  <FontAwesomeIcon
                    icon={faPersonChalkboard}
                    className={styles.tutorico}
                  />
                  <label for="tutor">Tutor</label>
                </div>
              </div>
            </div>
          </div> */}

          <div className={styles.inputcontainer}>
            <div className={styles.inputgroup}>
              <label className={styles.label}>Name</label>
              <div className={styles.inputwrapper}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                <input
                  className={styles.name}
                  type="text"
                  placeholder="Severus Snape"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputgroup}>
              <label className={styles.label}>Email</label>
              <div className={styles.inputwrapper}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />

                <input
                  className={styles.email}
                  type="email"
                  value={email}
                  id="email"
                  placeholder="severus@hogwarts.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputgroup}>
              <label className={styles.label}>Phone no.</label>
              <div className={styles.inputwrapper}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                <input
                  className={styles.name}
                  type="text"
                  placeholder="Phone no"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputgroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputwrapper}>
                <button
                  className={styles.eyebtn}
                  //className={styles.showpasswordbutton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>

                <input
                  className={styles.pass}
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  value={password}
                  id="password"
                  placeholder="not12345"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.btncontainer}>
            <button className={styles.button} onClick={handleSignup}>
              Signup
            </button>

            {errorMessage && (
              <p className={styles.errormessage}>{errorMessage}</p>
            )}
          </div>

          <div className={styles.signuplink}>
            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
