import React, {useState, useEffect} from "react";
import BookCard from "../BookCard";
import Spinner from "../Spinner";

import { saveBookIds, getSavedBookIds } from '../../utils/localStorage';
import { useMutation } from '@apollo/client';
import { ADD_FAV, ADD_READ, DELETE_FAV, DELETE_SAVED } from '../../utils/mutations';
import { UPDATE_READ_BOOKS, UPDATE_BOOKS, UPDATE_CURRENT_SEARCH } from '../../utils/actions';
import Auth from '../../utils/auth';

import { useSelector, useDispatch } from "react-redux";

export default function SearchResults({searchedBooks, searchInput, title}) {

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  // saveFavourites in localStorage 
  const [savedFavourites, setSavedFavourites] = useState(getSavedBookIds('save_favourites'));
  const [savedRead, setSavedRead] = useState(getSavedBookIds('save_read'));
  
  useEffect(() => {
      dispatch({
        type: UPDATE_CURRENT_SEARCH,
        currentSearch: searchedBooks
      });
  }, [searchedBooks, searchInput]);

  useEffect(() => {
    dispatch({
      type: UPDATE_READ_BOOKS,
      readBooks: savedRead
    })
  }, [savedRead]);

  useEffect(() => {
    dispatch({
      type: UPDATE_BOOKS,
      savedBooks: savedFavourites
    })
  }, [savedFavourites]);

  // mutation to save favourite
  const [ addFavouriteBook ] = useMutation(ADD_FAV);
  const [ addReadBook ] = useMutation(ADD_READ);
  const [ deleteFavouriteBook ] = useMutation(DELETE_FAV);
  const [ deleteReadBook ] = useMutation(DELETE_SAVED);

  const handleSaveFavourite = async (bookId) => {
    const bookDetails = state.currentSearch.find(book => book.bookId === bookId);

    if(!Auth.loggedIn()) {
      console.log('not logged in');
      return false;
    }

    try {
      await addFavouriteBook({
        variables: { input: bookDetails}
      });

      if(savedFavourites.length > 0) {
        if(savedFavourites.find(bookId => bookId === bookDetails.bookId)) {
          return false;
        }
        saveBookIds('save_favourites', [...savedFavourites, bookDetails.bookId]);
        setSavedFavourites([...savedFavourites, bookDetails.bookId]); 
      } else {
        saveBookIds('save_favourites', [...savedFavourites, bookDetails.bookId]);
        setSavedFavourites([...savedFavourites, bookDetails.bookId]); 
      }
    } catch (e) {
      console.log(e)
    }
  }; 

  const handleSaveRead = async (bookId) => {
    const saveBookDetails = state.currentSearch.find(book => book.bookId === bookId);
    console.log(saveBookDetails);

    if(!Auth.loggedIn()) {
      console.log('not logged in');
      return false;
    }

    try {
      await addReadBook({
        variables: { input: saveBookDetails}
      });

      if(savedRead.length > 0) {
        if(savedRead.find(bookId => bookId === saveBookDetails.bookId)) {
          console.log('there is a duplicate');
          return false;
        }
        saveBookIds('save_read', [...savedRead, saveBookDetails.bookId]);
        setSavedRead([...savedRead, saveBookDetails.bookId]); 
      } else {
        saveBookIds('save_read', [...savedRead, saveBookDetails.bookId]);
        setSavedRead([...savedRead, saveBookDetails.bookId]); 
      }
    } catch (e) {
      console.log(e)
    }

  };

  // remove favourite book
  const removeFavorite = (bookId) => {
    if(!Auth.loggedIn()) {
      console.log('not logged in');
      return false;
    }

    try {
      deleteFavouriteBook({
        variables: {bookId: bookId}
      });

      const removedDeleted = savedFavourites.filter(id => id !== bookId);

      saveBookIds('save_favourites', [...removedDeleted]);
      setSavedFavourites([...removedDeleted]);
    } catch(e) {
      console.log.error(e);
    }
  };

  
  // remove read book
  const removeRead = (bookId) => {
    if(!Auth.loggedIn()) {
      console.log('not logged in');
      return false;
    }

    try {
      deleteReadBook({
        variables: {bookId: bookId}
      });

      const removedDeleted = savedRead.filter(id => id !== bookId);

      saveBookIds('save_read', [...removedDeleted]);
      setSavedRead([...removedDeleted]);
    } catch(e) {
      console.log.error(e);
    }
  };

  if(searchedBooks.length === 0) {
    return (
      // <Spinner />
      <div>Sorry! No Books to show!</div>
    )
  }

  return (
    <div className="container">
      <h1 className="text-center m-4">{title}</h1>
      <div className="books-container container d-flex flex-wrap justify-content-center">
        {searchedBooks && searchedBooks.map((book) => (
          <BookCard 
            book={book}
            handleSaveFavourite={handleSaveFavourite}
            handleSaveRead={handleSaveRead}
            removeFavorite={removeFavorite}
            removeRead={removeRead}
            key={book.bookId}/>
        ))}
      </div>
    </div>
  )
}