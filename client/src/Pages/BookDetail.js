import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner";
import { idbPromise } from "../utils/indexedDb";
import { ALL_BOOKS } from "../utils/actions";
import { getSavedBookIds } from '../utils/localStorage';
import { fetchRelatedBooks, fetchCurrentBook, deepSearchCategories } from '../utils/helpers';
import BooksCarousel from "../components/BooksCarousel";
import FavSaveButtons from "../components/FavSaveButtons";
import ReactHtmlParser from 'react-html-parser';
import { QUERY_PRICE_LIST } from "../utils/queries";
import { useLazyQuery } from '@apollo/client';
import amazonIcon from '../assets/images/amazon_icon.png';
import indigoIcon from '../assets/images/indigo_logo.png';
import googlePlayIcon from '../assets/images/google_play_icon.png';
import openLibIcon from '../assets/images/op_icon.png';

import { useSelector, useDispatch } from "react-redux";

export default function BookDetail({bookId}) {
  const [getPriceList, { data }] = useLazyQuery(QUERY_PRICE_LIST);
  const [priceList, setPriceList] = useState({});


  // Go back to previous page
  const history = useNavigate();
  const goBack = () => {
    history(-1);
  };

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [savedFavourites, setSavedFavourites] = useState(getSavedBookIds('save_favourites'));
  const [savedRead, setSavedRead] = useState(getSavedBookIds('save_read'));

  const { id } = useParams();
  const [currentBook, setCurrentBook] = useState({});
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [allBooks, setAllbooks] = useState([currentBook, ...relatedBooks]);
  const [openLibraryState, setOpenLibraryState] = useState(false);

  useEffect(() => {
    if (data) {
      let amazonBookPrice = data.getPriceList?.amazon.bookPrice || '';
      let amazonEBookPrice = data.getPriceList?.amazon.priceEbook || '';
      let indigoBookPrice = data.getPriceList?.indigo.bookPrice || '';
      let indigoEBookPrice = data.getPriceList?.indigo.priceEbook || '';

      if(amazonBookPrice === 'Not Available') {
        amazonBookPrice = '';
      }

      if(amazonEBookPrice === 'Not Available') {
        amazonEBookPrice = '';
      }

      if(indigoBookPrice === 'Not Available') {
        indigoBookPrice = '';
      }

      if(indigoEBookPrice === 'Not Available') {
        indigoEBookPrice = '';
      }

      setPriceList({
        amazonBookPrice,
        amazonEBookPrice,
        indigoBookPrice,
        indigoEBookPrice
      });
    }
  }, [data]);

  useEffect(() => {

      let cBook;

      async function fetchData() {

        if(!state.allbooks && state.allbooks.length === 0) {
          await idbPromise('allbooks', 'get').then(async (books) => {
            // use retrieved data to set global state for offline browsing
            await dispatch({
              type: ALL_BOOKS,
              allbooks: books
            });

            cBook = books.find(book => book.bookId === id);
            setCurrentBook(cBook);
          });
        } else {
          if(state.allbooks) {
            cBook = state.allbooks.find(book => book?.bookId === id);
          if(cBook) {
            setCurrentBook(cBook);
            dispatch({
              type: ALL_BOOKS,
              allbooks: [cBook]
            });
          }
          }
        }

        if(!currentBook || Object.keys(currentBook).length === 0) {
          cBook = await fetchCurrentBook(id);
          await setCurrentBook(cBook);
          dispatch({
            type: ALL_BOOKS,
            allbooks: [cBook]
          });

          if(cBook) {
            const relatedBooks = await fetchRelatedBooks(cBook.categories[0],cBook.authors[0]);
            if(relatedBooks && relatedBooks.length >= 3) {
            await setRelatedBooks(relatedBooks);
          }
          }
        } else {
          if(cBook) {
          const relatedBooks = await deepSearchCategories(cBook.categories[0]);
          if(relatedBooks && relatedBooks.length > 3) {
            setRelatedBooks(relatedBooks);
          }
          }
        }

        if(relatedBooks) {
          dispatch({
            type: ALL_BOOKS,
            allbooks: relatedBooks
          });
        
      }
    }
        fetchData();
    }, []);

    useEffect(() => {
      if(currentBook && Object.keys(currentBook).length !== 0) {
        getPriceList({
        variables: { isbn: currentBook.isbn13 }
      });
      }

      
      async function fetchBookStatus() {
        if(currentBook && currentBook.isbn13) {
          try {
            const response = await fetch(`https://openlibrary.org/isbn/${currentBook.isbn13}.json`);
            if(response.status === 200) {
              setOpenLibraryState(true);
            } else {
              setOpenLibraryState(false);
            } 
          } catch(e) {
            console.error('Open library is not available for this book');
          }
            
        }
      }

      fetchBookStatus();
    }, [currentBook]);

    useEffect(() => {
      if(currentBook && relatedBooks.length > 1) {
        setAllbooks([currentBook, ...relatedBooks]);
      } else if (currentBook && relatedBooks.length === 0 ) {
        setAllbooks([currentBook]);
      }

    }, [currentBook, relatedBooks])


  if(!currentBook) {
    return(
      <div className="container">
        <h1 className="fs-1 m-lg-5 m-3">Sorry! Something went wrong...</h1>
        <p className="fs-3 m-lg-5 m-3">Please try again in a bit...</p>
      </div>
    )
  }

  if(Object.keys(currentBook).length === 0) {
    return (
      <Spinner />
    )
  }

  return (
    <>
      <div className="container detail-pg" key={bookId}>
        <div className="ms-3 ms-lg-5 mt-5 mb-3">
          <button className="btn btn-theme" onClick={goBack}><i className="fas fa-arrow-circle-left"></i> Go Back</button>
        </div>
        <div className="detail-container d-flex justify-content-around pb-5">
          <div className="image-container left-column text-end">
            <img src={currentBook.image ? currentBook.image : ``} alt=""
              style={{minWidth: '250px'}} />
          </div>
          <div className="info-container text-start">
            <h3 className="fs-2"><span><i className="fas fa-book"></i></span> {currentBook.title}</h3>
            {currentBook.authors && <p className="mb-2"><span className="fw-bold">{currentBook.authors.map(((auth, i) => 
              <span className="me-2" key={i}><i className="fas fa-user-edit"></i> {auth}</span>
              ))}</span></p>}
            <div className="book-deatailed-desc">{ReactHtmlParser(currentBook.description)}</div>
            {currentBook.googleRatings ?
              <p className="mb-1 mt-2"><span><i className="fas fa-star-half-alt"></i></span> Ratings: <span className="fw-bold">{currentBook.googleRatings}</span></p>
              : ''}
            {currentBook.categories && <p className="mb-1 book-cat"><span><i className="fas fa-th-list"></i></span> Categories: <span className="fw-bold">{currentBook.categories}</span></p>}
            {currentBook.publisher && <p className="mb-1"><span><i className="fas fa-building"></i></span> Pushlisher: <span className="fw-bold">{currentBook.publisher}</span></p>}
            {currentBook.publishedDate && <p className="mb-1"><span><i className="fas fa-calendar-alt"></i></span> Pushlished Date: <span className="fw-bold">{currentBook.publishedDate}</span></p>}
            <div className="buttons-container buy-buttons d-flex flex-wrap my-3">
              {/* Amazon Pricing */}
                { priceList && (priceList.amazonBookPrice || priceList.amazonEBookPrice) ?
                  <div className="sale-btn-cont my-1">
                  <a href={`https://www.amazon.ca/s?k=${`${currentBook.title} by ${currentBook.authors[0]}` }&i=stripbooks&linkCode=qs`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 amazon-btn">
                  <img className="reatil-img-icon" src={amazonIcon} alt="" />
                  </a>
                  <a 
                    href={`https://www.amazon.ca/s?i=stripbooks&rh=p_66%3A${currentBook.isbn13}&s=relevanceexprank&Adv-Srch-Books-Submit.x=34&Adv-Srch-Books-Submit.y=9&unfiltered=1&ref=sr_adv_b`}
                    target="_blank"
                    rel="noreferrer">
                  {priceList && priceList.amazonBookPrice && 
                      <span className="reg-book-price px-2">
                      Paperback 
                      <span className="list-price ms-1 fs-4">
                      ${priceList.amazonBookPrice }
                      </span>
                    </span>
                    }
                    {priceList && priceList.amazonEBookPrice && 
                      <span className="reg-book-brice px-2 bl-1">
                      Kindle
                      <span className="list-price ms-1 fs-4">
                      ${priceList.amazonEBookPrice }
                      </span>             
                    </span>}
                  </a>
                </div>
                : ''}
                {/* Indigo pricing */}
                { priceList && (priceList.indigoBookPrice || priceList.indigoEBookPrice) ?
                    <div className="sale-btn-cont my-1">
                      <a href={`https://www.chapters.indigo.ca/en-ca/books/name/${currentBook.isbn13}-item.html`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 indigo-btn">
                      <img className="reatil-img-icon" src={indigoIcon} alt="" />
                      </a>
                      <a href={`https://www.chapters.indigo.ca/en-ca/books/name/${currentBook.isbn13}-item.html`}
                        target="_blank"
                        rel="noreferrer">
                      {priceList && priceList.indigoBookPrice && 
                          <span className="reg-book-price px-2">
                          Paperback 
                          <span className="list-price ms-1 fs-4">
                          ${priceList.indigoBookPrice }
                          </span>
                        </span>}
                        {priceList && priceList.indigoEBookPrice && 
                          <span className="reg-book-price px-2 bl-1">
                          E-book
                          <span className="list-price ms-1 fs-4">
                          ${priceList.indigoEBookPrice}
                          </span>             
                        </span>}
                      </a>
                    </div> : ''}
              {/* Google play books */}
              { currentBook.googlePlayBooks && currentBook.googleListPrice &&
                    <div className="sale-btn-cont my-1">
                      <a href={currentBook.googlePlayBooks}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 googlePlay-btn">
                      <img className="reatil-img-icon" src={googlePlayIcon} alt="" />
                      </a>
                      <a href={currentBook.googlePlayBooks}>
                      {currentBook && currentBook.googlePlayBooks && 
                          <span className="reg-book-price px-2">
                          E-book 
                          <span className="list-price ms-1 fs-4">
                          ${currentBook.googleListPrice }
                          </span>
                        </span>}
                      </a>
                    </div> }
                {openLibraryState && 
                <div className="sale-btn-cont my-1">
                <a href={`https://openlibrary.org/isbn/${currentBook.isbn13}`}
                target="_blank" 
                rel="noreferrer" 
                className="py-2 px-3 open-library">
                <img className="reatil-img-icon" src={openLibIcon} alt="" /></a>
                <a href={`https://openlibrary.org/isbn/${currentBook.isbn13}`}
                  target="_blank"
                  rel="noreferrer">
                  <span className="reg-book-price px-2">
                  Read for FREE!
                  </span>
                </a>
                </div>
                }
            </div>
            <div className="my-2 details-fav-buttons">
              <FavSaveButtons 
                gbookId={currentBook.bookId}
                searchedBooks={allBooks}
                setSearchedBooks={setAllbooks}
                savedFavourites={savedFavourites}
                setSavedFavourites={setSavedFavourites}
                savedRead={savedRead}
                setSavedRead={setSavedRead}
                />
            </div>
          </div>
        </div>
        {relatedBooks && relatedBooks.length !== 0 &&
        <div className="related-books mb-5">
          <h2 className="fs-3 m-3 m-lg-4">Related Books</h2>
          <div className="book-list">
              <BooksCarousel className="mb-5"
              searchedBooks={relatedBooks}
              savedFavourites={savedFavourites}
              setSavedFavourites={setSavedFavourites}
              savedRead={savedRead} 
              setSavedRead={setSavedRead}
              setSearchedBooks={setRelatedBooks}
            />
          </div>
         </div>}
      </div>
    </>
  )

}