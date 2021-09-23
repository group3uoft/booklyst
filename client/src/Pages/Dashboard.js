import React, { useState, useEffect } from "react";
import SearchResults from "../components/SearchResults";
import { searchHandle } from "../utils/helpers";
import { Link } from "react-router-dom";
import Spinner from '../components/Spinner';
import { deepSearchHandle } from "../utils/helpers";

<<<<<<< HEAD
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { idbPromise } from "../utils/indexedDb";

import { useDispatch } from "react-redux";
import { ALL_BOOKS, UPDATE_CURRENT_SEARCH } from "../utils/actions";
=======
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import { useSelector, useDispatch } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// import { UPDATE_CURRENT_SEARCH, UPDATE_HISTORY } from "../../utils/actions";
>>>>>>> e29fa770b213b593f67f8ae86cd259bd4ee153ed

export default function Dashboard() {
  const { loading, data } = useQuery(QUERY_ME);

<<<<<<< HEAD
  // saveFavourites in localStorage 
  const [savedFavourites, setSavedFavourites] = useState(getSavedBookIds('save_favourites'));
  const [savedRead, setSavedRead] = useState(getSavedBookIds('save_read'));
  // const [ deletedSavedBook, setDeletedSavedBook ] = useState('');
  // const [ deletedReadBook, setDeletedReadBook ] = useState('');

  const dispatch = useDispatch();
  // const dispatch = useDispatch();

  const [booksToRender, setBooksToRender] = useState([]);
  const [title, setTitle] = useState('My Recomendations');
=======
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
>>>>>>> e29fa770b213b593f67f8ae86cd259bd4ee153ed

  const userData = data?.getMe || {};

  // render the initial search
  useEffect(() => {
    async function fetchData() {
      const data = await searchHandle('best sellers');
      await setBooksToRender(data);

      await dispatch({
        type: ALL_BOOKS,
        allbooks: booksToRender
      });

      // save the data to IDB
      await booksToRender.forEach((book) => {
      idbPromise('allbooks', 'put', book);
      });
    }

    fetchData();
  }, []);

  // store the saved books in localhost
  useEffect(() => {
    if(savedFavourites.length === 0) {
      const saveBooks = userData.favourites.map(book => book.bookId);
      saveBookIds('save_favourites', saveBooks);   
    }

    if(savedFavourites.length === 0) {
      const saveReadBooks = userData.read.map(book => book.bookId); 
      saveBookIds('save_read', saveReadBooks);
    }
  }, []);

  // useEffect(() => {
  //   const books = booksToRender.filter(book => book.bookId !== deletedSavedBook);
  //   console.log('books', books);
  //   setBooksToRender(books);
  //   setDeletedSavedBook('');
  // }, [deletedSavedBook]);

  // useEffect(() => {
  //   const books = booksToRender.filter(book => book.bookId !== deletedReadBook);
  //   console.log('books', books);
  //   setBooksToRender(books);
  //   setDeletedReadBook('');
  // }, [deletedReadBook]);

  const buttonHandle = async (e) => {
    switch (e.target.textContent) {
<<<<<<< HEAD
      case 'Favourites': 
        dispatch({
          type: UPDATE_CURRENT_SEARCH,
          currentSearch: userData.favourites
        });
        setBooksToRender(userData.favourites);
        setTitle('My Favourites');
        break;

      case 'Recomendations': 
        const data = await deepSearchHandle('best sellers');
        await setBooksToRender(data);
        setTitle('My Recomendations');
        break;
      
      case 'Radom Picks': 
        const randomPicks = await deepSearchHandle('random');
        await setBooksToRender(randomPicks );
        setTitle('My Random Picks');
      break;

      case 'Already read': 
      dispatch({
        type: UPDATE_CURRENT_SEARCH,
        currentSearch: userData.read
      });
     
      setBooksToRender(userData.read);
      setTitle('My Read Books');
      break;

      default: 
        console.log('showing new books');  
    } 
  };

  if(loading) {
    return (
      < Spinner />
    )
  }

  if(!userData?.username) {
=======
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

  if (!userData?.username) {
>>>>>>> e29fa770b213b593f67f8ae86cd259bd4ee153ed
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
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
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
<<<<<<< HEAD
            <button onClick={buttonHandle} className="my-1 btn btn-theme">Recomendations</button>
            <button onClick={buttonHandle} className="my-1 btn btn-theme">Favourites</button>
            <button onClick={buttonHandle} className="my-1 btn btn-theme">Already read</button>
            <button onClick={buttonHandle} className="my-1 btn btn-theme">Radom Picks</button>
          </div> 
=======
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
>>>>>>> e29fa770b213b593f67f8ae86cd259bd4ee153ed
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
<<<<<<< HEAD
              <h5 className="fw-bold fs-4"><span className="mr-3"><i className="fas fa-boxes"></i></span> Books you owned.</h5>
              <p className="font-small mb-0" >Currently you have <span className="fw-bold">{`10`} books</span> in your shelf</p>
            </div>
            <div className="mt-2 db-q-sec pt-3 pb-2 px-3">
              <h5 className="fw-bold fs-4"><span className="mr-3"><i className="fas fa-book-reader"></i></span> Books you read.</h5>
              <p className="font-small" >You have read <span className="fw-bold">{userData.readCount} books</span> in total</p>
            </div>
            <div className="mt-2 db-q-sec pt-3 pb-2 px-3">
              <h5 className="fw-bold fs-4"><span className="mr-3"><i className="fas fa-heart"></i></span> Books you liked.</h5>
              <p className="font-small pb-0" >You saved <span className="fw-bold">{userData.favouritesCount} books</span> in your collection</p>
=======
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
>>>>>>> e29fa770b213b593f67f8ae86cd259bd4ee153ed
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <SearchResults 
        searchedBooks={booksToRender}
        setSearchedBooks={setBooksToRender}
        title={title}
        savedFavourites={savedFavourites}
        setSavedFavourites={setSavedFavourites}
        savedRead={savedRead}
        setSavedRead={setSavedRead}
        // setDeletedSavedBook={setDeletedSavedBook}
        // setDeletedReadBook={setDeletedReadBook} 
        />
=======
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={onReset}>Reset</button>
      <p>{message}</p>
      <SearchResults searchedBooks={searchedBooks} searchInput={searchInput} />
>>>>>>> e29fa770b213b593f67f8ae86cd259bd4ee153ed
    </div>
  );
}
