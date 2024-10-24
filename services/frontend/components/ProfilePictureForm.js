/* npm install cloudinary first*/
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/UploadForm.module.css";

export default function UploadForm({tutorId}) {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const router = useRouter();
  const id = tutorId;
  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "learnly_preset");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dhtogoc8c/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    console.log(data.secure_url);
    const response = await fetch("/api/upload-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: data.secure_url, id: id }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      if (data.message == "Successful") {
        setImageSrc(data.secure_url);
        setUploadData(data);
      } else {
        console.log("Couldn't Upload!");
        setImageSrc("");
        setUploadData("");
      }
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.heading}>UPLOAD YOUR IMAGE</h1>

        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" className={styles.inputt} />
          </p>

          <img
            src={imageSrc}
            alt="Preview will apprear here."
            className={styles.previewImage}
          />

          {imageSrc && !uploadData && (
            <p>
              <button className={styles.uploadButton}>Upload Files</button>
            </p>
          )}

          {uploadData && <p> Uploaded Successfully! </p>}
        </form>
      </main>
    </div>
  );
}
