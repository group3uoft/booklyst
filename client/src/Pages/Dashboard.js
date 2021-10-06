import React, {useState, useEffect} from "react";
import SearchResults from "../components/SearchResults";
import { Link } from "react-router-dom";
import Spinner from '../components/Spinner';
import { deepSearchHandle, favouriteCategories } from "../utils/helpers";
import Auth from '../utils/auth';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { saveBookIds, getSavedBookIds, saveQuickNote, getQuickNote } from '../utils/localStorage';
import { idbPromise } from "../utils/indexedDb";

import { useSelector, useDispatch } from "react-redux";
import { ALL_BOOKS, UPDATE_CURRENT_SEARCH } from "../utils/actions";

export default function Dashboard({booksToRender, setBooksToRender}) {
  const { loading, data } = useQuery(QUERY_ME);

  // saveFavourites in localStorage 
  const [savedFavourites, setSavedFavourites] = useState(getSavedBookIds('save_favourites'));
  const [savedRead, setSavedRead] = useState(getSavedBookIds('save_read'));
  const [quickNote, setQuickNote] = useState(getQuickNote('quick_note'));
  const [noteEdit, setNoteEdit] = useState(false);
  const [favouriteCats, setFavouriteCats] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const [title, setTitle] = useState('My Recomendations');
  // const [ deletedSavedBook, setDeletedSavedBook ] = useState('');
  // const [ deletedReadBook, setDeletedReadBook ] = useState('');

  const dispatch = useDispatch();
  const state = useSelector(state => state); 

  const userData = data?.getMe || {};

  // render the initial search
  useEffect(() => {
      if(state.currentSearch.length > 0) {
        setBooksToRender(state.currentSearch);
      } else {
        async function fetchData() {
        const data = await deepSearchHandle('best sellers');
        await setBooksToRender(data);
        }

        fetchData();
    }

  }, []);

  useState(() => {
    dispatch({
      type: ALL_BOOKS,
      allbooks: booksToRender
    });

    dispatch({
      type: UPDATE_CURRENT_SEARCH,
      currentSearch: booksToRender
    });

    // save the data to IDB
    booksToRender.forEach((book) => {
    idbPromise('allbooks', 'put', book);
    });
  }, [booksToRender]);

  // store the saved books in localhost
  useEffect(() => {
    if(Auth.loggedIn()) {
      if(userData.username) {
        if(savedFavourites.length === 0) {
          const saveBooks = userData.favourites.map(book => book.bookId);
          saveBookIds('save_favourites', saveBooks); 
          setSavedFavourites(saveBooks);  
        }
    
        if(savedRead.length === 0) {
          const saveReadBooks = userData.read.map(book => book.bookId); 
          saveBookIds('save_read', saveReadBooks);
          setSavedRead(saveReadBooks);
        }

        setFavouriteCats(favouriteCategories(userData.favourites, userData.read));
        setSearchHistory(userData.searchHistory);
      }
    }

  }, [userData.favourites, userData.read]);

  useEffect(() => {
    if(quickNote) {
      saveQuickNote(quickNote);
    }
  }, [quickNote]);

  const buttonHandle = async (e) => {
    switch (e.target.textContent) {
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
        const randomPicks = await deepSearchHandle('programming');
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
    } 
  };

  if(!Auth.loggedIn()) {
    return (
      <div className="container-full d-flex justify-content-center flex-column">
        <div className="container p-3">
        <p className="fs-2">Oops.. Sorry! <i className="fas fa-sad-tear"></i>
          <br/> You need to be logged in to see this page.
          <br/> Click the button to login! </p>
        <Link to="/login"
          className="btn btn-theme btn-lg">Login</Link>
        </div>
      </div>
    )
  }

  if(loading) {
    return (
      < Spinner />
    )
  }

  const heandleClickSearch = async (e) => {
    const query = (e.target.textContent);
    const search = await deepSearchHandle(query);
    await setBooksToRender(search);
    setTitle(`Searching for ${query}`);
  }

  return (
    <div className="container mb-5">
      <div className="py-5 d-flex justify-content-around flex-wrap">
        <div className="profile-deatils left-column">
          <div className="profile-image">
            <img src="https://picsum.photos/250" alt="" />
          </div>

          <div className="pofile-info mt-3">
            <h5 className="fs-2 fw-bold text-capitalize">Hello {userData.username}!</h5>
            {noteEdit ? 
              <textarea className="w-100 fs-4" value={quickNote} onChange={(e) => setQuickNote(e.target.value)} onBlur={() => setNoteEdit(false)}></textarea> :
              <p className="w-100 fs-4" onClick={() => setNoteEdit(true)}>{quickNote}</p>}
          </div>

          <div className="prof-button-container d-flex flex-column">
            <button onClick={buttonHandle} className="my-1 btn btn-theme">Recomendations</button>
            <button onClick={buttonHandle} className="my-1 btn btn-theme">Favourites</button>
            <button onClick={buttonHandle} className="my-1 btn btn-theme">Already read</button>
            <button onClick={buttonHandle} className="my-1 btn btn-theme">Radom Picks</button>
          </div> 
        </div>
        
        <div className="dashboard-details d-flex flex-column py-4 px-4 text-start">
          <h2 className="text-left">Profile Stats</h2>
          <div className="stats-container">
            <div className="mt-3 db-q-sec pt-3 pb-2 px-3">
              <h5 className="fw-bold fs-4"><span className="mr-3"><i className="far fa-thumbs-up"></i></span> Book categories you liked.</h5>
              {favouriteCats.length !== 0 ? favouriteCats.map((cat, index) => (
                <button onClick={heandleClickSearch} className="btn btn-accent m-1" key={index}>{cat}</button>
              )) : 
                <p>No categories to show at this moment... Please favourite some books!</p>}
            </div>
            <div className="mt-2 db-q-sec pt-3 pb-2 px-3">
              <h5 className="fw-bold fs-4"><span className="mr-3"><i className="fas fa-search"></i></span> Your search queries.</h5>
              {searchHistory.length !== 0 ? searchHistory.map((search, index) => (
                <button onClick={heandleClickSearch} className="btn btn-accent m-1" key={index}>{search}</button>
              )): <p>No search history to show at this moment... Please search some books!</p>}
            </div>
            <div className="mt-2 db-q-sec pt-3 pb-2 px-3">
              <h5 className="fw-bold fs-4"><span className="mr-3"><i className="fas fa-book-reader"></i></span> Books you read.</h5>
              <p className="font-small" >You have read <span className="fw-bold">{userData.readCount} books</span> in total</p>
            </div>
            <div className="mt-2 db-q-sec pt-3 pb-2 px-3">
              <h5 className="fw-bold fs-4"><span className="mr-3"><i className="fas fa-heart"></i></span> Books you liked.</h5>
              <p className="font-small pb-0" >You saved <span className="fw-bold">{userData.favouritesCount} books</span> in your collection</p>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  )
};