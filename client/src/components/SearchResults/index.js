import React from "react";
import BookCard from "../BookCard";
import Spinner from "../Spinner";

export default function SearchResults(
  { 
    searchedBooks,
    title,
    setSearchedBooks,
    savedFavourites,
    setSavedFavourites,
    savedRead,
    setSavedRead,
  }) {

  if(searchedBooks.length === 0) {
    return (
      <Spinner />
    )
  }

  return (
    <div className="container">
      <h1 className="text-center mx-4 my-5">{title}</h1>
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
            // setDeletedSavedBook={setDeletedSavedBook}
            // setDeletedReadBook={setDeletedReadBook} 
            />
        ))}
      </div>
    </div>
  )
}