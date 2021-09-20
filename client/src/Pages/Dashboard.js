import React, { useState, useEffect } from "react";
import SearchResults from "../components/SearchResults";
import { searchHandle } from "../utils/helpers";
import { Link } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import { useSelector, useDispatch } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// import { UPDATE_CURRENT_SEARCH, UPDATE_HISTORY } from "../../utils/actions";

export default function Dashboard() {
  const { loading, data } = useQuery(QUERY_ME);

  const state = useSelector((state) => state);
  // const dispatch = useDispatch();

  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("new books");

  const [message, setMessage] = useState("");
  const commands = [
    {
      command: "*",
      callback: (text) => setMessage(text),
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

  console.log("data", data);

  const userData = data?.getMe || {};

  useEffect(() => {
    async function fetchData() {
      const data = await searchHandle(searchInput);
      await setSearchedBooks(data);
    }

    fetchData();
  }, [searchInput]);

  console.log(state);

  const buttonHandle = async (e) => {
    console.log(e.target.textContent);
    switch (e.target.textContent) {
      case "Favourites":
        console.log("Need to show all the favourites");
        // test
        setSearchInput("favourites");
        break;

      case "Recomendations":
        console.log("Need to show all the Recomendations");
        break;

      case "Radom Picks":
        console.log("Need to show all the Radom Picks");
        break;

      case "Already read":
        console.log("Need to show all the Already read");
        break;

      default:
        console.log("showing new books");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("userdata", userData);
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  if (!userData?.username) {
    return (
      <div className="container-full d-flex justify-content-center flex-column">
        <div className="container p-3">
          <p className="fs-2">
            Oops.. Sorry! <i className="fas fa-sad-tear"></i>
            <br /> You need to be logged in to see this page.
            <br /> Click the button to login!{" "}
          </p>
          <Link to="/login" className="btn btn-theme btn-lg">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mb-5">
      <div className="py-5 d-flex justify-content-around flex-wrap">
        <div className="profile-deatils left-column">
          <div className="profile-image">
            <img src="https://picsum.photos/250" alt="" />
          </div>

          <div className="pofile-info mt-3">
            <h5 className="fs-2 fw-bold text-capitalize">
              Hello {userData.username}!
            </h5>
            <p>
              Any short notes.. such as reading this page.. or this page
              number..{" "}
            </p>
          </div>

          <div className="prof-button-container d-flex flex-column">
            <button onClick={buttonHandle} className="my-1 btn btn-theme">
              Favourites
            </button>
            <button onClick={buttonHandle} className="my-1 btn btn-theme">
              Recomendations
            </button>
            <button onClick={buttonHandle} className="my-1 btn btn-theme">
              Radom Picks
            </button>
            <button onClick={buttonHandle} className="my-1 btn btn-theme">
              Alreay read
            </button>
          </div>
        </div>

        <div className="dashboard-details d-flex flex-column py-4 px-4 text-start">
          <h2 className="text-left">Profile Stats</h2>
          <div className="stats-container">
            <div className="mt-3 db-q-sec pt-3 pb-2 px-3">
              <h5 className="fw-bold fs-4">
                <span className="mr-3">
                  <i className="far fa-thumbs-up"></i>
                </span>{" "}
                Book categories you liked.
              </h5>
              <button onClick={buttonHandle} className="btn btn-accent m-1">
                Classics
              </button>
              <button onClick={buttonHandle} className="btn btn-accent m-1">
                Action
              </button>
              <button onClick={buttonHandle} className="btn btn-accent m-1">
                Fiction
              </button>
            </div>
            <div className="mt-2 db-q-sec pt-3 pb-2 px-3">
              <h5 className="fw-bold fs-4">
                <span className="mr-3">
                  <i className="fas fa-boxes"></i>
                </span>{" "}
                Books you owned.
              </h5>
              <p className="font-small mb-0">
                Currently you have <span className="fw-bold">10 books</span> in
                your shelf
              </p>
            </div>
            <div className="mt-2 db-q-sec pt-3 pb-2 px-3">
              <h5 className="fw-bold fs-4">
                <span className="mr-3">
                  <i className="fas fa-book-reader"></i>
                </span>{" "}
                Books you read.
              </h5>
              <p className="font-small">
                You have read <span className="fw-bold">50 books</span> in total
              </p>
            </div>
            <div className="mt-2 db-q-sec pt-3 pb-2 px-3">
              <h5 className="fw-bold fs-4">
                <span className="mr-3">
                  <i className="fas fa-heart"></i>
                </span>{" "}
                Books you liked.
              </h5>
              <p className="font-small pb-0">
                You saved <span className="fw-bold">150 books</span> in your
                collection
              </p>
            </div>
          </div>
        </div>
      </div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={onReset}>Reset</button>
      <p>{message}</p>
      <SearchResults searchedBooks={searchedBooks} searchInput={searchInput} />
    </div>
  );
}
