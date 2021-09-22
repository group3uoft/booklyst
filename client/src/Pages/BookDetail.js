import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Spinner from "../components/Spinner";
import { idbPromise } from "../utils/indexedDb";
import { ALL_BOOKS, UPDATE_CURRENT_SEARCH } from "../utils/actions";

import { useSelector, useDispatch } from "react-redux";

export default function BookDetail() {

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [currentBook, setCurrentBook] = useState({});

  useEffect(() => {
      if(!state.allbooks) {
        idbPromise('allbooks', 'get').then((books) => {
          // use retrieved data to set global state for offline browsing
          dispatch({
            type: ALL_BOOKS,
            allbooks: books
          });
          setCurrentBook(books.find(book => book.isbn13 === id));
        })
      } else {
        setCurrentBook(state.allbooks.find(book => book.isbn13 === id));
      }
    }, []);


  if(Object.keys(currentBook).length === 0) {
    return (
      <Spinner />
    )
  }

  return (
    <>
      <div className="container">
        <div className="detail-container d-flex justify-content-around py-5">
          <div className="image-container left-column text-end">
            <img src={currentBook.image ? currentBook.image : ``} alt=""
              style={{minWidth: '250px'}} />
          </div>
          <div className="info-container text-start">
            <h3 className="fs-2">{currentBook.title}</h3>
            <p className="mb-1">by <span className="fw-bold">{currentBook.authors}</span></p>
            <p className="book-deatailed-desc" >{currentBook.description}</p>
            {currentBook.googleRatings ?
              <p className="mb-1"><span></span> Ratings: <span className="fw-bold">{currentBook.googleRatings}</span></p>
              : ''}
            <p className="mb-1"><span></span> Categories: <span className="fw-bold">{currentBook.categories}</span></p>
            <p className="mb-1"><span></span> Pushlisher: <span className="fw-bold">{currentBook.publisher}</span></p>
            <p className="mb-1"><span></span> Pushlished Date: <span className="fw-bold">{currentBook.publishedDate}</span></p>
            {currentBook.googleListPrice ? 
              <p className="mb-1 fs-3"> Price: <span className="fw-bold">{currentBook.googleListPrice}</span></p> 
              : ''}
            <div className="buttons-container d-flex flex-wrap">
              <a href={`https://www.amazon.com/s?i=stripbooks&rh=p_66%3A${currentBook.isbn13}&s=relevanceexprank&Adv-Srch-Books-Submit.x=34&Adv-Srch-Books-Submit.y=9&unfiltered=1&ref=sr_adv_b`}
                target="_blank"
                rel="noreferrer"
                className="btn amazon-btn m-1">
                <span className="me-2"><i className="fas fa-shopping-cart"></i></span> Amazon</a>
              <a href={`https://www.chapters.indigo.ca/en-ca/books/name/${currentBook.isbn13}-item.html`}
                target="_blank" 
                rel="noreferrer" 
                className="btn indigo-btn m-1">
                <span className="me-2"><i className="fas fa-shopping-cart"></i></span> Indigo</a>
              <a href={currentBook.goolePlayBooks}
                target="_blank" 
                rel="noreferrer" 
                className="btn google-play m-1">
                <span className="me-2"><i className="fas fa-shopping-cart"></i></span> Google Play</a>
              <a href={`https://openlibrary.org/isbn/${currentBook.isbn13}`}
                target="_blank" 
                rel="noreferrer" 
                className="btn open-library m-1">
                <span className="me-2"><i className="fas fa-book-open"></i></span> Open Library</a>
            </div>
            <div className="buttons-container d-flex flex-wrap">
              <button className="btn save-later m-1"><span className="me-2"><i className="fas fa-heart"></i></span> Mark as favourite</button>
              <button className="btn save-later m-1"><span className="me-2"><i className="fas fa-check-square"></i></span> Mark as read</button>
            </div>
          </div>
        </div>
        <div className="related-books">
          <h2 className="fs-3">Related Books</h2>
          <div className="book-list">
            
          </div>
        </div>
      </div>
    </>
  )

}