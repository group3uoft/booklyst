import React, {useState, useEffect} from "react";
import Hero from "../Hero";
import SearchResults from "../SearchResults";

import { useSelector, useDispatch } from "react-redux";
import { UPDATE_CURRENT_SEARCH, UPDATE_HISTORY } from "../../utils/actions";

export default function Home() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('new books');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    dispatch({
      type: UPDATE_CURRENT_SEARCH,
      currentSearch: searchedBooks
    });

  }, [searchedBooks]);

  console.log(state);

  return (
    <div className="container-full">
      <Hero 
        setSearchedBooks={setSearchedBooks}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        setSearchHistory={setSearchHistory} />
      <SearchResults 
        searchedBooks={searchedBooks}
        searchInput={searchInput} />
    </div>
  );
};