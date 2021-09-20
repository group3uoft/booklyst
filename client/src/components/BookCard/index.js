import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function BookCard({book, handleSaveFavourite, handleSaveRead, removeFavorite, removeRead}) {

  const state = useSelector(state => state);

  return (
      <div
      className="book-card card m-2"
      style={{minWidth: '220px', maxWidth: '280px', minHeight: '200px'}}>
        <Link to={`/books/${book.isbn13}`}>
        <div 
          className="card-img-top d-flex justify-content-center align-items-center"
          style={{minHeight: '193px'}}>
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
            {/* <a href={`https://www.amazon.com/s?i=stripbooks&rh=p_66%3A${book.isbn13}&s=relevanceexprank&Adv-Srch-Books-Submit.x=34&Adv-Srch-Books-Submit.y=9&unfiltered=1&ref=sr_adv_b`} target="_blank" rel="noreferrer" className="btn amazon-btn mb-2">Buy Now from Amazon</a>
            <a href={`https://www.chapters.indigo.ca/en-ca/books/name/${book.isbn13}-item.html`} target="_blank" rel="noreferrer" className="btn indigo-btn mb-2">Buy it now from Indigo</a> */}
            <Link to={`/books/${book.isbn13}`} className="btn btn-theme mb-2 w-full text-start px-4"><span className="me-3"><i className="fas fa-list"></i></span> See More Details</Link>
            <div className="buttons-container">
              {state.savedBooks.find(id => id === book.bookId) ? 
                <button 
                onClick={() => removeFavorite(book.bookId)} 
                className="btn save-later w-full mb-2 text-start px-4">
                <span className="me-3"><i className="far fa-heart"></i></span> Remove favourite</button> :
                <button 
                onClick={() => handleSaveFavourite(book.bookId)} 
                className="btn save-later w-full mb-2 text-start px-4">
                <span className="me-3"><i className="far fa-heart"></i></span> Mask as favourite</button>
              }
              {
                state.readBooks.find(id => id === book.bookId) ?
                <button onClick={() => removeRead(book.bookId)}
                  className="btn save-later w-full mb-2 text-start px-4">
                <span className="me-3"><i className="fas fa-check"></i></span> Remove read</button> :
                <button 
                  onClick={() => handleSaveRead(book.bookId)}
                  className="btn save-later w-full mb-2 text-start px-4">
                  <span className="me-3"><i className="fas fa-check"></i></span> Mark as read</button>
              }
              
          </div>
        </div>
      </div>
  )
}