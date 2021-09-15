import React from "react";
import BookCard from "../BookCard";

export default function SearchResults({searchedBooks}) {

  console.log('results', searchedBooks);

  return (
    <div className="container">
      <h1 className="text-center m-4">Deals of the Day</h1>
      <div className="books-container container d-flex flex-wrap justify-content-center">
        {searchedBooks && searchedBooks.map((book) => (
          <BookCard book={book} key={book.bookId}/>
        ))}
      </div>
    </div>
  )
}