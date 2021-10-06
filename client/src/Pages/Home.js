import React, {useState, useEffect} from "react";
import Hero from "../components/Hero";
import SearchResults from "../components/SearchResults";

import { useSelector, useDispatch } from "react-redux";
import { UPDATE_BOOKS,UPDATE_READ_BOOKS, ALL_BOOKS, UPDATE_CURRENT_SEARCH } from "../utils/actions";
import { idbPromise } from "../utils/indexedDb";
import { getSavedBookIds } from '../utils/localStorage';

export default function Home({searchInput, setSearchInput, setTitle, title}) {
  const dispatch = useDispatch();

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // const [searchInput, setSearchInput] = useState('best seller');
  const [searchHistory, setSearchHistory] = useState([]);
  
  // saveFavourites in localStorage 
  const [savedFavourites, setSavedFavourites] = useState(getSavedBookIds('save_favourites'));
  const [savedRead, setSavedRead] = useState(getSavedBookIds('save_read'));
  // const [ deletedBook, setDeletedBook ] = useState('');

  useEffect(() => {
    if(searchedBooks && searchedBooks.length > 0) {
      dispatch({
        type: ALL_BOOKS,
        allbooks: searchedBooks
      });

      dispatch({
        type: UPDATE_CURRENT_SEARCH,
        currentSearch: searchedBooks
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
        setTitle={setTitle}
        title={title} />
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