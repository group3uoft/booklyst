import React, {useState} from "react";
import Hero from "../Hero";
import SearchResults from "../SearchResults";

import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('new books');

  console.log('state',state);

  return (
    <div className="container-full">
      <Hero 
        setSearchedBooks={setSearchedBooks}
        setSearchInput={setSearchInput}
        searchInput={searchInput} />
      <SearchResults 
        searchedBooks={searchedBooks}
        searchInput={searchInput} />
    </div>
  );
};