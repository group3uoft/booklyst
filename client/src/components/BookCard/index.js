import React from "react";
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';

import FavSaveButtons from "../FavSaveButtons";

export default function BookCard(
  {
  searchedBooks,
  setSearchedBooks,
  savedFavourites,
  setSavedFavourites,
  savedRead,
  setSavedRead,
  book,
  setDeletedSavedBook,
  setDeletedReadBook
  }
) {
  return (
      <div
      className="book-card card mx-auto mb-3 m-lg-2"
      style={{minWidth: '220px', maxWidth: '280px', minHeight: '200px'}}>
        <Link to={`/books/${book.bookId}`}>
        <div 
          className="card-img-top d-flex justify-content-center align-items-center"
          style={{minHeight: '208px'}}>
          <img 
          className="card-image" 
          src={book.image ? book.image : `https://picsum.photos/128/193`} 
          alt="Card cap"
          />
        </div>
        </Link>
        <div className="card-body">
          <h5 
            className="card-title book-title"
            style={{minHeight: '45px'}}>{book.title}</h5>
          <p className="card-text book-desc">{book.description}</p>
          <FavSaveButtons 
              gbookId={book.bookId}
              searchedBooks={searchedBooks}
              setSearchedBooks={setSearchedBooks}
              savedFavourites={savedFavourites}
              setSavedFavourites={setSavedFavourites}
              savedRead={savedRead}
              setSavedRead={setSavedRead}
              setDeletedSavedBook={setDeletedSavedBook}
              setDeletedReadBook={setDeletedReadBook}/>
            {/* <a href={`https://www.amazon.com/s?i=stripbooks&rh=p_66%3A${book.isbn13}&s=relevanceexprank&Adv-Srch-Books-Submit.x=34&Adv-Srch-Books-Submit.y=9&unfiltered=1&ref=sr_adv_b`} target="_blank" rel="noreferrer" className="btn amazon-btn mb-2">Buy Now from Amazon</a>
            <a href={`https://www.chapters.indigo.ca/en-ca/books/name/${book.isbn13}-item.html`} target="_blank" rel="noreferrer" className="btn indigo-btn mb-2">Buy it now from Indigo</a> */}
            {!Auth.loggedIn() && <Link to={`/books/${book.bookId}`} className="btn btn-theme max-240 mb-2 mx-1 w-full text-start px-4"><span className="me-3"><i className="fas fa-list"></i></span> See More Details</Link>}

        </div>
      </div>
  )
}