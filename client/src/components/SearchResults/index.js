import React, {useState, useEffect} from "react";
import BookCard from "../BookCard";
import Spinner from "../Spinner";
import  Swiper  from '../Swiper';

export default function SearchResults(
  { 
    searchedBooks,
    searchInput,
    title,
    setSearchedBooks,
    savedFavourites,
    setSavedFavourites,
    savedRead,
    setSavedRead,
    setDeletedBook
  }) {

    console.log('searchbooks',searchedBooks );

  if(searchedBooks.length === 0) {
    return (
      <Spinner />
    )
  }

  return (
    <div className="container">
      <h1 className="text-center m-4">{title}</h1>
      <div className="books-container container d-flex flex-wrap justify-content-center">
        {searchedBooks && searchedBooks.map((book) => (
          <BookCard 
            book={book}
            key={book.bookId}
            searchedBooks={searchedBooks}
            setSearchedBooks={setSearchedBooks}
            savedFavourites={savedFavourites}
            setSavedFavourites={setSavedFavourites}
            savedRead={savedRead}
            setSavedRead={setSavedRead}
            setDeletedBook={setDeletedBook} />
        ))}
      </div>
    </div>
  )
}