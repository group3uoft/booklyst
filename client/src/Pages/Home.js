import React, {useState, useEffect} from "react";
import Hero from "../components/Hero";
import SearchResults from "../components/SearchResults";

import { useDispatch } from "react-redux";
import { UPDATE_BOOKS,UPDATE_READ_BOOKS, ALL_BOOKS } from "../utils/actions";
import { idbPromise } from "../utils/indexedDb";
import { getSavedBookIds } from '../utils/localStorage';

export default function Home() {
  // const state = useSelector(state => state);
  const dispatch = useDispatch();

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('best seller');
  const [searchHistory, setSearchHistory] = useState([]);
  const [title, setTitle] = useState('Best Sellers');
  // saveFavourites in localStorage 
  const [savedFavourites, setSavedFavourites] = useState(getSavedBookIds('save_favourites'));
  const [savedRead, setSavedRead] = useState(getSavedBookIds('save_read'));
  // const [ deletedBook, setDeletedBook ] = useState('');

  useEffect(() => {
    if(!searchedBooks || searchedBooks.length > 0) {
      console.log('test', searchedBooks);
      dispatch({
        type: ALL_BOOKS,
        allbooks: searchedBooks
      });
  
      // save the data to IDB
      searchedBooks.forEach((book) => {
        idbPromise('allbooks', 'put', book);
      });
    }
    
  }, [searchedBooks]);

  useEffect(() => {
    if(searchInput !== 'best seller') {
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
    <div className="container-full mb-5">
      <Hero 
        setSearchedBooks={setSearchedBooks}
        searchedBooks={searchedBooks}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        setSearchHistory={setSearchHistory}
        setTitle={setTitle} />
      <SearchResults 
        setSearchedBooks={setSearchedBooks}
        searchedBooks={searchedBooks}
        searchInput={searchInput} 
        savedFavourites={savedFavourites}
        setSavedFavourites={setSavedFavourites}
        savedRead={savedRead} 
        setSavedRead={setSavedRead}
        title={title}
        // setDeletedBook={setDeletedBook}
        />
    </div>
  );
};