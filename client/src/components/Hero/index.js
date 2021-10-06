import React, { useEffect, useState } from "react";
import bgImg from '../../assets/images/hero-bg.jpg'
import { deepSearchHandle } from "../../utils/helpers";
import { Alert } from 'react-bootstrap';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_SEARCH_HISTORY } from "../../utils/mutations";
import ImageRec from "../ImageRec";
import CaptureImage from '../CaptureImage'
import axios from 'axios';

import { useSelector } from "react-redux";


export default function Hero({
  setSearchedBooks, 
  setSearchInput, 
  searchInput, 
  setSearchHistory, 
  searchedBooks,
  setTitle,
  title }) {
  const {
    transcript,
    listening,
    // resetTranscript,
    // browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const state = useSelector(state => state);

  const [voiceSearch, setVoiceSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [ addSearchHistory ] = useMutation(ADD_SEARCH_HISTORY);

  const [images, setImages] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  
  const [imageResult, setImageResult] = useState('');

  const fetchFunc = async (dataUri) => {
     const data = { 
        requests: [
          {
            image: {
                content: dataUri.slice(23),
            },
            features: [{
              type: "TEXT_DETECTION",
              maxResults: 5
            }]
          }
    ]}

    await axios({
        method: 'post',
        url: `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
        data,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then((r) => {
        let result = r.data.responses[0].fullTextAnnotation.text.replace(/(\r\n|\n|\r)/gm, " ");
        const shortenedWord = result.match(/(\b[A-Z][A-Z]+|\b[A-Z]\b)/g).slice(0, 10).join(' ');
        setImageResult(shortenedWord);
      })
      .catch((error) => {
        setShowAlert(true);
        console.error(error);
    })
  }

    useEffect(() => {
    if(images.length > 0 && images[images.length-1].data_url) {
      fetchFunc(images[images.length-1].data_url);
    }
  }, [images]);

  useEffect(() => {
    if(imgSrc) {
      fetchFunc(imgSrc);
    }

  }, [imgSrc])

  useEffect(() => {
    setVoiceSearch(transcript);
  }, [listening]);

  useEffect(() => {
    if(imageResult) {
      async function fetchData() {
        const data = await deepSearchHandle(imageResult);
        await setSearchedBooks(data);
        setTitle(`Search Results...`);
      }

      fetchData();
      // clear the voice search
      setVoiceSearch("");
      setImages([]);
    }
  }, [imageResult]);

  // set timer for alert
  useEffect(() => {
    if(showAlert) {
      setTimeout(function() {
        setShowAlert(false);
      }, 3000);
    }
  }, [showAlert]);

  useEffect(() => {
      if(voiceSearch) {
        async function fetchData() {
          const data = await deepSearchHandle(voiceSearch);
          await setSearchedBooks(data);
          setSearchHistory(voiceSearch);
          setTitle(`Search Results...`);

          if(Auth.loggedIn()) {
            try {
              await addSearchHistory({
                variables: {searchHistory: voiceSearch}
              });
            } catch (e) {
              console.error(e);
            }
          }
        }
  
        fetchData();
        // clear image result
        setImageResult("");
      }
  }, [voiceSearch]);

  const searchSubmit = async (e) => {
    e.preventDefault();
    const query = e.target[0].value;
    // run the search
    if(query) {
        // setSearchInput(query);
        const data = await deepSearchHandle(query);
        if(data) {
          setTitle('Search Results...');
          await setSearchedBooks(data);
          setSearchHistory(query);
        } else {
          setShowAlert(true);
        }
      
    } else {
      setShowAlert(true);
    }

    // clear image search
    setImages([]);
    // clear the voice search
    setVoiceSearch("");
    setImageResult("");
    setImages([]);
  }

  useEffect(() => {
    async function fetchData() {
      if(state.currentSearch.length > 0) {
        if(title !== 'Best Sellers') {
          setTitle('Search Results...');
        }
        setSearchedBooks(state.currentSearch);
      } else {
        const data = await deepSearchHandle(searchInput);
        await setSearchedBooks(data);
      }
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
          <div className="d-flex">
          <span className={`btn sp-btn w-100 border-input ${listening ? 'btn-orange' : 'btn-light'}`}
            onClick={SpeechRecognition.startListening}
            ><i className={`fas fa-microphone-alt ${listening ? 'fs-25' : 'fs-1rem'}`}></i></span>
          <ImageRec 
            setImages={setImages}
            images={images} />
          <div>
            <CaptureImage setImgSrc={setImgSrc} />
          </div>
          </div>
        </form>
        <div className="m-1">
          {voiceSearch || imageResult ? 
          <p className="mb-0 transcript mx-auto">Searching for &nbsp;
          <span className="fw-bold">{voiceSearch && voiceSearch} {imageResult && imageResult}</span></p> : ''}
        </div>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger' 
          className="alert-button my-2 mx-3 mx-lg-0">
              Oops! Not able to generate any results.. Please try again!
          </Alert>
        <div className="d-flex">
        </div>
      </div>
    </div>
  )
};