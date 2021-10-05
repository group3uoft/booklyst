import React, { useState, useCallback, useMemo } from "react";

import ImageCapture from "react-image-data-capture";

export default function CaptureImage({setImgSrc}) {
  const [showImgCapture, setShowImgCapture] = useState(false);
  const config = useMemo(() => ({ video: { facingMode: "environment" } }), []);
  /*
    { video: true } - Default Camera View
    { video: { facingMode: environment } } - Back Camera
    { video: { facingMode: "user" } } - Front Camera
  */
  const [imgFile, setImgFile] = useState(null);
  const onCapture = (imageData) => {
    // read as webP
    setImgSrc(imageData.webP);
    // read as file
    setImgFile(imageData.file);
    // Unmount component to stop the video track and release camera
    setShowImgCapture(false);
  };
  const onError = useCallback((error) => {
    console.log(error);
  }, []);

  // imgFile can be used as a file upload form submission
  const formData = new FormData();
  formData.append("file", imgFile);

  const handleClick = () => {
    setShowImgCapture(true);
  }

  const handleBlur = () => {
    setShowImgCapture(false);
  };

  return (
    <>
      <div>
        <span 
          onClick={handleClick}
          className="btn btn-light sp-btn w-100 border-input mx-auto">
          <i className="fas fa-camera"></i>
        </span>
      </div>
      {showImgCapture &&
        <div className="img-cap-container">
        <div className="cancel-capture"
          onClick={handleBlur}>
          <i className="fas fa-times"></i>
        </div>
        <ImageCapture
          className="mx-auto"
          onCapture={onCapture}
          onError={onError}
          userMediaConfig={config}
        />
        {/* edited the origin module div */}
      </div>}
    </>
  );
};
