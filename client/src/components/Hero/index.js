import React, { useEffect, useState } from "react";
import bgImg from '../../assets/images/hero-bg.jpg'
import { deepSearchHandle } from "../../utils/helpers";
import { Alert } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Hero({
  setSearchedBooks, 
  setSearchInput, 
  searchInput, 
  setSearchHistory, 
  searchedBooks,
  setTitle }) {
  const {
    transcript,
    listening,
    // resetTranscript,
    // browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [voiceSearch, setVoiceSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // function onChangeHandler() {
  //   setVoiceSearch("");
  // }

  useEffect(() => {
    setVoiceSearch(transcript);
  }, [listening])

  useEffect(() => {
      if(voiceSearch) {
        async function fetchData() {
          const data = await deepSearchHandle(voiceSearch);
          await setSearchedBooks(data);
          setSearchHistory(data);
          setTitle('Search Results...')
        }
  
        setVoiceSearch("");
  
        fetchData();
      }
  }, [voiceSearch]);

  const searchSubmit = async (e) => {
    e.preventDefault();
    const query = e.target[0].value;
    // run the search
    if(query) {
      setSearchInput(query);
      const data = await deepSearchHandle(query);
      await setSearchedBooks(data);
      setSearchHistory(query);
    } else {
      setShowAlert(true);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await deepSearchHandle(searchInput);
      await setSearchedBooks(data);
    }
    if(!searchedBooks || searchedBooks.length === 0) {
      fetchData();
    }
  }, [searchInput, setSearchInput, setSearchedBooks, searchedBooks]);

  return(
    <div className="d-flex justify-content-center align-items-center hero-bg" style={{backgroundImage: `url(${bgImg})`}}>
      <div className="search-container d-flex justify-content-center flex-column p-2 p-lg-4">
        <form className="d-flex p-md-3 p-lg-0" onSubmit={searchSubmit}>
          <div className="input-container d-flex">
            <input 
            className="form-control mr-sm-2" 
            name="search"
            type="search" 
            placeholder="Search books, ISBN, Author" 
            aria-label="Search" 
            />
          </div>
          <button className="btn btn-theme mx-2">Search</button>
          <span className={`btn sp-btn w-100 border-input ${listening ? 'btn-orange' : 'btn-light'}`}
            onClick={SpeechRecognition.startListening}
            ><i className={`fas fa-microphone-alt ${listening ? 'fs-25' : 'fs-1rem'}`}></i></span>
        </form>
        <div className="m-1">
          {transcript && <p className="mb-0 transcript mx-auto">Searching for &nbsp;
          <span className="fw-bold">{transcript}</span></p>}
        </div>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger' 
          className="alert-button my-2 mx-3 mx-lg-0">
              Please enter a valid search!
          </Alert>
        <div className="d-flex">

          {/* <ImageUpload 
            setImageLoading={setImageLoading}
          /> */}
          {/* <span className="btn btn-light sp-btn w-100 border-input"><i className="fas fa-microphone-alt"></i></span> */}
        </div>
      </div>
    </div>
  )
};