import React, {useState} from "react";
import Hero from "../Hero";
import SearchResults from "../SearchResults";

export default function Home() {

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);

  return (
    <div className="container-full">
      <Hero setSearchedBooks={setSearchedBooks} />
      <SearchResults searchedBooks={searchedBooks} />
    </div>
  );
};