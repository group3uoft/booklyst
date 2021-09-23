import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import Spinner from "../components/Spinner";
import { idbPromise } from "../utils/indexedDb";
import { ALL_BOOKS } from "../utils/actions";
import { getSavedBookIds } from '../utils/localStorage';
import { fetchRelatedBooks, fetchCurrentBook, deepSearchCategories } from '../utils/helpers';
import BooksCarousel from "../components/BooksCarousel";
import FavSaveButtons from "../components/FavSaveButtons";

import { useSelector, useDispatch } from "react-redux";

export default function BookDetail({bookId}) {

  // Go back to previous page
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [savedFavourites, setSavedFavourites] = useState(getSavedBookIds('save_favourites'));
  const [savedRead, setSavedRead] = useState(getSavedBookIds('save_read'));

  const { id } = useParams();
  const [currentBook, setCurrentBook] = useState({});
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [allBooks, setAllbooks] = useState([currentBook, ...relatedBooks]);
  const [openLibraryState] = useState(true);

  useEffect(() => {

      let cBook;

      if(state.allbooks.length === 0) {
        idbPromise('allbooks', 'get').then((books) => {
          // use retrieved data to set global state for offline browsing
          dispatch({
            type: ALL_BOOKS,
            allbooks: books
          });
          cBook = books.find(book => book.bookId === id);
          setCurrentBook(cBook);
        })
      } else {
        cBook = state.allbooks.find(book => book.bookId === id);
        setCurrentBook(cBook);
        dispatch({
          type: ALL_BOOKS,
          allbooks: [cBook]
        });
      }

      async function fetchData() {
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

        // if(currentBook) {
        //   const response = await fetch(`https://openlibrary.org/isbn/${cBook.isbn13}`, {
        //     mode: 'no-cors'
        //   });
        //   if(!response.ok) {
        //     setOpenLibraryState(false);
        //   } else {
        //     setOpenLibraryState(true);
        //   }
          
        // }
      }
      
        fetchData();
    }, []);

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
      <div className="container" key={bookId}>
        <div className="ms-5 mt-5 mb-3">
          <button className="btn btn-theme" onClick={goBack}><i className="fas fa-arrow-circle-left"></i> Go Back</button>
        </div>
        <div className="detail-container d-flex justify-content-around pb-5">
          <div className="image-container left-column text-end">
            <img src={currentBook.image ? currentBook.image : ``} alt=""
              style={{minWidth: '250px'}} />
          </div>
          <div className="info-container text-start">
            <h3 className="fs-2">{currentBook.title}</h3>
            {currentBook.authors && <p className="mb-1">by <span className="fw-bold">{currentBook.authors}</span></p>}
            <p className="book-deatailed-desc" >{currentBook.description}</p>
            {currentBook.googleRatings ?
              <p className="mb-1"><span></span> Ratings: <span className="fw-bold">{currentBook.googleRatings}</span></p>
              : ''}
            {currentBook.categories && <p className="mb-1"><span></span> Categories: <span className="fw-bold">{currentBook.categories}</span></p>}
            {currentBook.publisher && <p className="mb-1"><span></span> Pushlisher: <span className="fw-bold">{currentBook.publisher}</span></p>}
            {currentBook.publishedDate && <p className="mb-1"><span></span> Pushlished Date: <span className="fw-bold">{currentBook.publishedDate}</span></p>}
            {currentBook.googleListPrice &&
              <p className="mb-1 fs-3"> Price: <span className="fw-bold">{currentBook.googleListPrice}</span></p>}
            <div className="buttons-container d-flex flex-wrap">
              {/* <a href={`https://www.amazon.com/s?i=stripbooks&rh=p_66%3A${currentBook.isbn13}&s=relevanceexprank&Adv-Srch-Books-Submit.x=34&Adv-Srch-Books-Submit.y=9&unfiltered=1&ref=sr_adv_b`} */}
                <a href={`https://www.amazon.ca/s?k=${currentBook.isbn13 ? currentBook.isbn13 : currentBook.title}&i=stripbooks&linkCode=qs`}
                target="_blank"
                rel="noreferrer"
                className="btn amazon-btn m-1">
                <span className="me-2"><i className="fas fa-shopping-cart"></i></span> Amazon</a>
              <a href={`https://www.chapters.indigo.ca/en-ca/books/name/${currentBook.isbn13}-item.html`}
                target="_blank" 
                rel="noreferrer" 
                className="btn indigo-btn m-1">
                <span className="me-2"><i className="fas fa-shopping-cart"></i></span> Indigo</a>
              {currentBook.googlePlayBooks && 
              <a href={currentBook.googlePlayBooks}
              target="_blank" 
              rel="noreferrer" 
              className="btn google-play m-1">
              <span className="me-2"><i className="fas fa-shopping-cart"></i></span> Google Play</a>}
              {openLibraryState && 
              <a href={`https://openlibrary.org/isbn/${currentBook.isbn13}`}
              target="_blank" 
              rel="noreferrer" 
              className="btn open-library m-1">
              <span className="me-2"><i className="fas fa-book-open"></i></span> Open Library</a>}
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