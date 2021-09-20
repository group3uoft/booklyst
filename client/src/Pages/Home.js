import React, {useState, useEffect} from "react";
import Hero from "../components/Hero";
import SearchResults from "../components/SearchResults";

import { useSelector, useDispatch } from "react-redux";
import { UPDATE_CURRENT_SEARCH, UPDATE_HISTORY } from "../utils/actions";
import { idbPromise } from "../utils/indexedDb";

export default function Home() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('new books');
  const [searchHistory, setSearchHistory] = useState([]);
  const [title, setTitle] = useState('Best Sellers');

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

  }, [setSearchInput, searchInput])

  return (
    <div className="container-full">
      <Hero 
        setSearchedBooks={setSearchedBooks}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        setSearchHistory={setSearchHistory} />
      <SearchResults 
        searchedBooks={searchedBooks}
        searchInput={searchInput} 
        title={title}
        />
    </div>
  );
};