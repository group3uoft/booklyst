import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import {createWorker} from 'tesseract.js';


export default function ImageUpload({setImageLoading}) {
  const [pictures, setPictures] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setImageLoading("Recognizing image... Please wait!")
    const img = (URL.createObjectURL(event.target.files[0]));
  
    const worker = createWorker({
      logger: m => console.log(m)
    });
    
    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: {text} } = await worker.recognize(img);
      console.log('data', text);
      const resultArray = text.match(/(?:\w{3,}|[@])+/gmi);
      if(resultArray.length > 1) {
        const result = resultArray.join(' ');
        console.log('result', result);
        setImageLoading(result);
      } else {
        setImageLoading(resultArray);
      }
      
      await worker.terminate();
    })();
  }

  console.log(text, 'test');

  console.log(pictures);
  return (
    // <ImageUploader
    //   withIcon={true}
    //   onChange={onDrop}
    //   imgExtension={[".jpg", ".gif", ".png", ".gif"]}
    //   maxFileSize={5242880}
    // />
    <div>
      <span className="btn btn-light me-2 sp-btn border-input "><i className="fas fa-camera me-3"></i>
      <input type="file" onChange={handleChange} /></span>
    </div>
  );
};