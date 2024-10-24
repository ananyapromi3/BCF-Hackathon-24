import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ShowImage = ({studentid}) => {
    const router = useRouter();
    
    const [image, setImage] = useState(null); // Initialize image state
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`/api/getStudentImage`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ studentid: studentid}),
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
    }, [studentid]); 

    return (
        <div>
            {errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : image ? (
                <div>
                    <img src={image} alt="Tutor Image" style={{ maxWidth: '500px', maxHeight: '500px' }} />

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShowImage;
