// import React, {useState} from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";

// const ShowImage = async () =>  {
//     const { tutorId } = useRouter().query;
//     const [errorMessage, setErrorMessage] = useState("");

//     const tutor_id = tutorId;
//     try 
//     {
//         const response = await fetch(`/api/getTutorImage/${tutor_id}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ tutor_id }),
//         });
//         const data = await response.json();
//         console.log(data);
//         if (response.ok) {
//             image = data.image;
//         }
//         else {
//             setErrorMessage("Error Occured");
//         }
//     } catch (error) {
//         setErrorMessage(error.message);
// }

//     return (
//         <div>
//             {errorMessage ? (
//                 <p className="text-red-500">{errorMessage}</p>
//             ) : (
//                 <div>
//                     <img src={image} alt="Tutor Image" />
//                 </div>
//             )}
//         </div>
//     );
// };





import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import 'normalize.css';
import styles from "../styles/TutorProfile.module.css";

const ShowImage = ({tutorid}) => {
    const router = useRouter();
    
    const [image, setImage] = useState(null); // Initialize image state
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`/api/getTutorImage`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ tutorid: tutorid }), // Use correct key
                });
                

                if (response.ok) {
                    const data = await response.json();
                    console.log("data !!!! ",data);
                    setImage(data[0].IMAGE);
                } else {
                    setErrorMessage("Error Occurred");
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchImage();
    }, [tutorid]); // Fetch image whenever tutorId changes

    return (
        <div>
            {errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : image ? (
                <div>
                    <img src={image} alt="Tutor Image" className={styles.tutorimg} />

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShowImage;
