import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { cloudinary } from "cloudinary-core";

export const UploadImage4 = () => {
  const presetKey = "dumn5jgp"; // Reemplaza con tu upload_preset de Cloudinary
  const cloudName = "dbxeaqsv4"; // Reemplaza con tu cloud_name de Cloudinary
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {		
		  uploadImage();
    	sendDataToAPI();
	}, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = () => {
      uploadImage(image);
      sendDataToAPI(username, title);
    
  };

  const sendDataToAPI = (data) => {
    console.log(data);

    fetch(`https://victormagacbt-bookish-adventure-9vpxgr6v467274p-3001.preview.app.github.dev/api/create-review`, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, title}) 
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("you create a review");
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
        }

  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", presetKey);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data;
        setImage(imageUrl); // Actualizamos el estado de "image" con la URL de la imagen cargada en Cloudinary
        // Ahora, también podemos enviar los otros datos a tu API
        sendDataToAPI({ ...formData, image: imageUrl });
      })
      .catch((error) => {
        console.error("Error al cargar la imagen en Cloudinary:", error.message);
      });
  };
  
  
    

    return (
      <div>
            <div>
                <input type="file" name="image" onChange={handleFile} />
            </div>
                {image && (
                <img src={image} className="w-50 h-50" alt="Uploaded Preview" />
                )}
            {/* Aquí puedes agregar los inputs para los datos adicionales */}
            <div>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>{setUsername(e.target.value)}}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>{setTitle(e.target.value)}}
                />
            </div>
            <div>
                <button onClick={handleUpload}>Subir a Cloudinary y enviar a la API</button>
            </div>
      </div>
    );
  };