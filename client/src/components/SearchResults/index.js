import React from "react";
import BookCard from "../BookCard";

export default function SearchResults({searchedBooks, searchInput}) {

  return (
    <div className="container">
      <h1 className="text-center m-4">{searchInput === 'new books' ? `Deals of the Day!`: `Search Results...`}</h1>
      <div className="books-container container d-flex flex-wrap justify-content-center">
        {searchedBooks && searchedBooks.map((book) => (
          <BookCard book={book} key={book.bookId}/>
        ))}
      </div>
    </div>
  )
}