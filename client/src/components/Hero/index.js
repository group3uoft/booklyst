import React, { useEffect, useState } from "react";
import bgImg from '../../assets/images/hero-bg.jpg'
import { deepSearchHandle } from "../../utils/helpers";
import ImageUpload from "../UploadImage";

export default function Hero({setSearchedBooks, setSearchInput, searchInput, setSearchHistory, searchedBooks}) {

  const [imageLoading, setImageLoading] = useState("");
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Hero({
  setSearchedBooks,
  setSearchInput,
  searchInput,
  setSearchHistory,
}) {
  const searchSubmit = async (e) => {
    e.preventDefault();
    const query = e.target[0].value;
    // run the search
    setSearchInput(query);
    const data = await deepSearchHandle(query);
    await setSearchedBooks(data);
    setSearchHistory(query);
  }
    setSearchHistory(searchInput);
  };
  const [message, setMessage] = useState("");
  const commands = [
    {
      command: "*",
      callback: (text) => {
        // from here you can grab the text and search for the text
        console.log(text);
        setMessage(text);
      },
    },
  ];
  const {
    initialTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  const onReset = () => {
    setMessage("");
    resetTranscript();
  };
  useEffect(() => {
    async function fetchData() {
      const data = await deepSearchHandle(searchInput);
      await setSearchedBooks(data);
    }
    if(!searchedBooks || searchedBooks.length === 0) {
      fetchData();
    }
  }, [searchInput, setSearchInput, setSearchedBooks, searchedBooks]);

  // return(
  //   <div className="d-flex justify-content-center align-items-center hero-bg" style={{backgroundImage: `url(${bgImg})`}}>
  //     <div className="search-container d-flex justify-content-center flex-column p-4">
  //       <form className="d-flex" onSubmit={searchSubmit}>
  //         <div className="input-container d-flex">
  //           <input 
  //           className="form-control mr-sm-2" 
  //           name="search"
  //           type="search" 
  //           placeholder="Search books, ISBN, Author" 
  //           aria-label="Search" 
  //           // value={imageLoading}
  //           // onChange={(e) => setSearchInput(e.target.value)}
  //           />
  //   fetchData();
  // }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div
      className="d-flex justify-content-center align-items-center hero-bg"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="search-container d-flex justify-content-center">
        <form className="d-flex" onSubmit={searchSubmit}>
          <div className="input-container d-flex">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search books, ISBN, Author"
              aria-label="Search"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <span className="btn btn-light mx-2 sp-btn">
              <i className="fas fa-camera"></i>
            </span>
            <span className="btn btn-light sp-btn">
              <button onClick={SpeechRecognition.startListening}>
                <i className="fas fa-microphone-alt"></i>Start
              </button>
            </span>
          </div>
          <button className="btn btn-theme mx-2">Search</button>
        </form>
        <div className="m-1">
          <p className="m-1 fs-3">Or you can search using</p>
        </div>
        <div className="d-flex">
          {/* <ImageUpload 
            setImageLoading={setImageLoading}
          /> */}
          <span className="btn btn-light sp-btn w-100 border-input"><i className="fas fa-microphone-alt"></i></span>
        </div>
      </div>
      <p>Microphone: {listening ? "on" : "off"}</p>
    </div>
  );
}
