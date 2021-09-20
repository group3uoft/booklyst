import React, { useEffect, useState } from "react";
import bgImg from "../../assets/images/hero-bg.jpg";
import { searchHandle } from "../../utils/helpers";
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
    // run the search
    const data = await searchHandle(searchInput);
    await setSearchedBooks(data);
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
      const data = await searchHandle(searchInput);
      await setSearchedBooks(data);
    }
    fetchData();
  }, []);

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
      </div>
      <p>Microphone: {listening ? "on" : "off"}</p>
    </div>
  );
}
