import { useRouter } from "next/router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "normalize.css";
import {
  faGraduationCap,
  faPersonChalkboard,
  faEnvelope,
  faKey,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import jwt from "jsonwebtoken";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    // Make a POST request to your backend API for authentication
    const response = await fetch("http://localhost:4001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status == 200) {
      console.log("Login successful!");
      // const data = await response.json();
      // localStorage.setItem("token",data.token);
      // if(data.result.ROLE=='student'){
      //   const id=data.result.USER_ID;
      //   setErrorMessage('');
      //   router.push(`/studentProfile/${id}`);
      //  console.log('Login successful!');

      // }
      // else if(data.result.ROLE=='teacher'){
      //   const id=data.result.USER_ID;
      //   setErrorMessage('');
      //   router.push(`/tutorProfile/${id}`);
      //  console.log('Login successful!');

      // }
      // else{
      //   setErrorMessage('Invalid Login!');
      //   setEmail(''); // Clear the email input field
      // setPassword(''); // Clear the password input field
      //   console.error('Login failed.');

      // }
      ///console.log(data.message); // Display the success message
    } else {
      setErrorMessage("Invalid Login!");
      setEmail(""); // Clear the email input field
      setPassword(""); // Clear the password input field
      console.error("Login failed.");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Fetch data here
      handleLogin();
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
            <h1>LOGIN</h1>
            {/* <p>Please select your role</p> */}
          </div>

          {/* <div className={styles.radiocon}>
                <div className={styles.radio_tile_group}>

                    <div className={styles.input_container}>
                        <input
                          type="radio"
                          id="student"
                          name="role"
                        />
                        <div className={styles.radio_tile}>
                        <FontAwesomeIcon icon={faGraduationCap} className={styles.studico}/>
                        
                            <label for="student">Student</label>
                        </div>
                    </div>

                    <div className={styles.input_container}>
                        <input 
                          type="radio"
                          id="tutor"
                          name="role"
                        />
                        <div className={styles.radio_tile}>
                            <FontAwesomeIcon icon={faPersonChalkboard}  className={styles.tutorico} />
                            <label for="tutor">Tutor</label>
                        </div>
                    </div>

                </div>
            </div> */}

          <div className={styles.inputcontainer}>
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.logincontainer}>
            <button className={styles.button} onClick={handleLogin}>
              Login
            </button>

            {errorMessage && (
              <p className={styles.errormessage}>{errorMessage}</p>
            )}
          </div>

          <div className={styles.signuplink}>
            <p>
              Don't have an account? <Link href="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
