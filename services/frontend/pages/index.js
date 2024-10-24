import 'normalize.css';
import React from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook
import styles from '../styles/Home.module.css';


const Home = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const handleLoginClick = () => {
    router.push('/login'); // Navigate to the login page
  };

  const handleSignupClick = () => {
    router.push('/signup'); // Navigate to the signup page
  };

  return (
    <div className={styles.container}>

    <div className={styles.bgcontainer}>
    <img className={styles.bgimg} src="/indexbgempty.png" alt="Image" />
    </div>

    <header className={styles.header}>
      <img src="/LogoWhitebg.png" alt="Image" />
    </header>




      <div className={styles.animationcard}>
      <div className={styles.acardcontent}></div>
      <div className={styles.ball}> <img src="/balldotted.svg" alt="Image" /> </div>
      <div className={styles.ball}><img src="/ballgradient.svg" alt="Image" /> </div>
      <div className={styles.ball}><img src="/balllong.svg" alt="Image" /> </div>
      <div className={styles.ball}><img src="/ballopacity.svg" alt="Image" /> </div>
      <div className={styles.ball}><img src="/balloutline.svg" alt="Image" /> </div>
      <div className={styles.ball}> <img src="/balldotted.svg" alt="Image" /> </div>
      <div className={styles.ball}><img src="/ballgradient.svg" alt="Image" /> </div>
      <div className={styles.ball}><img src="/balllong.svg" alt="Image" /> </div>
      <div className={styles.ball}><img src="/ballopacity.svg" alt="Image" /> </div>
      <div className={styles.ball}><img src="/balloutline.svg" alt="Image" /> </div>
    </div>






    <main className={styles.main}>

      


      <div className={styles.right}>
        <h1>Enhancing your potential and bringing out the best in you</h1>
        <p>Join us on the journey to find the perfect tutor for you</p>

        <div className={styles.btn}>

          <button className={styles.button1} onClick={handleLoginClick}>
            Login
          </button> 

          <button className={styles.button2} onClick={handleSignupClick}>
            Signup
          </button>

        </div>

      </div>

      <div className={styles.left}>
        <img src="/Main_img.png" alt="Image" />
      </div>


    </main>
  </div>
  );
};

export default Home;