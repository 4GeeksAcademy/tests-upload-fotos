import React, { useContext, useState } from "react";
import Axios from 'axios';
import {Image} from 'cloudinary-react'
import {Cloudinary} from "@cloudinary/url-gen";

import "../../styles/home.css";

export const UploadImg = () => {

	const cld = new Cloudinary({cloud: {cloudName: 'dbxeaqsv4'}});

    const [imageSelected, setImageSelected] = useState ("")

    const uploadImage = (files) =>{
        console.log(files[0])
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("uploader", "dbxeaqsv4");

        cld.v2.upload (
            "https://api.cloudinary.com/v1_1/dbxeaqsv4/image/upload", formData) 
            .then((response) => {
            console.log(response);
            });
    };

    return ( 
        <div>
            <input 
            type="file" 
            onChange={(e) =>{setImageSelected(e.target.files[0]);
            }} />

            <button onClick={uploadImage}>upload image</button>

            <Image cloudName="dbxeaqsv4" publicId=""/>
        </div>
    )
}
