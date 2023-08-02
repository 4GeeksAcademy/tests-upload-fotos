import React, { useState } from "react";
import "../../styles/home.css";
import { cloudinary } from "cloudinary-core";

export const UploadImage3 = () => {
  const presetKey = "dumn5jgp"; // Reemplaza con tu upload_preset de Cloudinary
  const cloudName = "dbxeaqsv4"; // Reemplaza con tu cloud_name de Cloudinary
  const [image, setImage] = useState("");
  const [data, setData] = useState({
    username: "",
    title: "",
    type: "",
    description: "",
    location: "",
    publishing_date: "",
    link: "",
    price: "",
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpload = () => {
    if (image) {
      uploadImage(image);
    } else {
      sendDataToAPI(data);
    }
  };


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
  
  const sendDataToAPI = (data) => {
    console.log(data);

    fetch(`https://victormagacbt-bookish-adventure-9vpxgr6v467274p-3001.preview.app.github.dev/api/create-review`, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data) 
        })
        .then((res) => res.json())
        .then((result) => {
            console.log("you create a review");
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
        }
    

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
            value={data.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={data.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={data.type}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={data.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={data.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="publishing_date"
            placeholder="Publishing Date"
            value={data.publishing_date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="link"
            placeholder="Link"
            value={data.link}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={data.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button onClick={handleUpload}>Subir a Cloudinary y enviar a la API</button>
        </div>
      </div>
    );
  };