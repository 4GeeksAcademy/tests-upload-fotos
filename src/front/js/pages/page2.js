import React, { useState } from "react";
import "../../styles/home.css";
import axios from "axios";


export const UploadImage = () => {

        const presetKey = "dumn5jgp";
        const cloudName = "dbxeaqsv4";
        const [image, setImage] = useState("");

        const handleFile = (e) =>{
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append("uploadPreset", presetKey);
            axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
            .then(res => setImage(res.data.secure_url))
            .catch(err => console.log(err));

        } 
       
    return ( 
        <div>
            <div>
                <input 
                type="file" 
                name="image"
                onChange={handleFile} />
                {/*<button onClick={uploadImage}>upload image</button>*/}   
            </div>
       
            <img src={image} classname="w-50 h-50" />
        </div>
    )
}