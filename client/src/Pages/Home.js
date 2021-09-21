import React, {useState, useEffect} from "react";
import Hero from "../components/Hero";
import SearchResults from "../components/SearchResults";

import { useSelector, useDispatch } from "react-redux";
import { UPDATE_CURRENT_SEARCH, UPDATE_HISTORY, UPDATE_BOOKS,UPDATE_READ_BOOKS } from "../utils/actions";
import { idbPromise } from "../utils/indexedDb";
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

export default function Home() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('new books');
  const [searchHistory, setSearchHistory] = useState([]);
  const [title, setTitle] = useState('Best Sellers');
  // saveFavourites in localStorage 
  const [savedFavourites, setSavedFavourites] = useState(getSavedBookIds('save_favourites'));
  const [savedRead, setSavedRead] = useState(getSavedBookIds('save_read'));

  useEffect(() => {
    dispatch({
      type: UPDATE_CURRENT_SEARCH,
      currentSearch: searchedBooks
    });

    // save the data to IDB
    searchedBooks.forEach((book) => {
      idbPromise('currentSearch', 'put', book);
    });
    
  }, [searchedBooks, dispatch]);

  useEffect(() => {
    if(searchInput !== 'new books') {
      setTitle('Search Results...');
    }

  }, [setSearchInput, searchInput]);

  useEffect(() => {
    dispatch({
      type: UPDATE_BOOKS,
      savedBooks: savedFavourites
    })
  }, [savedFavourites, dispatch]);
  
  useEffect(() => {
    dispatch({
      type: UPDATE_READ_BOOKS,
      readBooks: savedRead
    })
  }, [savedRead, dispatch]);

  return (
    <div className="container-full">
      <Hero 
        setSearchedBooks={setSearchedBooks}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        setSearchHistory={setSearchHistory} />
      <SearchResults 
        setSearchedBooks={setSearchedBooks}
        searchedBooks={searchedBooks}
        searchInput={searchInput} 
        savedFavourites={savedFavourites}
        setSavedFavourites={setSavedFavourites}
        savedRead={savedRead} 
        setSavedRead={setSavedRead}
        title={title}
        />
    </div>
  );
};