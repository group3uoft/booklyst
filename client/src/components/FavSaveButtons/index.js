import React, {useState, useEffect} from "react";

import { saveBookIds } from '../../utils/localStorage';
import { useMutation } from '@apollo/client';
import { ADD_FAV, ADD_READ, DELETE_FAV, DELETE_SAVED } from '../../utils/mutations';
import Auth from '../../utils/auth';

import { filterSavingBook } from "../../utils/helpers";

export default function FavSaveButtons(
  {
  searchedBooks,
  savedFavourites,
  setSavedFavourites,
  savedRead,
  setSavedRead,
  gbookId,
  // setDeletedSavedBook,
  // setDeletedReadBook
  }
) {;


    // mutation to save favourite
    const [ addFavouriteBook ] = useMutation(ADD_FAV);
    const [ addReadBook ] = useMutation(ADD_READ);
    const [ deleteFavouriteBook ] = useMutation(DELETE_FAV);
    const [ deleteReadBook ] = useMutation(DELETE_SAVED);

    const [ loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      setLoggedIn(Auth.loggedIn());
    }, [])
  
    const handleSaveFavourite = async (bookId) => {
      const bookToSave = filterSavingBook(searchedBooks, bookId);
      if(!Auth.loggedIn()) {
        return false;
      }
  
      try {
        await addFavouriteBook({
          variables: { input: {...bookToSave}}
        });
  
        if(savedFavourites.length > 0) {
          if(savedFavourites.find(bookId => bookId === bookToSave.bookId)) {
            return false;
          }
          saveBookIds('save_favourites', [...savedFavourites, bookToSave.bookId]);
          setSavedFavourites([...savedFavourites, bookToSave.bookId]); 
        } else {
          saveBookIds('save_favourites', [...savedFavourites, bookToSave.bookId]);
          setSavedFavourites([...savedFavourites, bookToSave.bookId]); 
        }
      } catch (e) {
        console.error(e)
      }
    }; 
  
    const handleSaveRead = async (bookId) => {
      const bookToSave = filterSavingBook(searchedBooks, bookId);
  
      if(!Auth.loggedIn()) {
        return false;
      }
  
      try {
        await addReadBook({
          variables: { input: {...bookToSave}}
        });
  
        if(savedRead.length > 0) {
          if(savedRead.find(bookId => bookId === bookToSave.bookId)) {
            return false;
          }
          saveBookIds('save_read', [...savedRead, bookToSave.bookId]);
          setSavedRead([...savedRead, bookToSave.bookId]); 
        } else {
          saveBookIds('save_read', [...savedRead, bookToSave.bookId]);
          setSavedRead([...savedRead, bookToSave.bookId]); 
        }
      } catch (e) {
        console.error(e)
      }
  
    };
  
    // remove favourite book
    const removeFavorite = (bookId) => {
      if(!Auth.loggedIn()) {
        return false;
      }
  
      try {
        deleteFavouriteBook({
          variables: {bookId: bookId}
        });
  
        const removedDeleted = savedFavourites.filter(id => id !== bookId);
        saveBookIds('save_favourites', [...removedDeleted]);
        setSavedFavourites([...removedDeleted]);
        // setDeletedSavedBook(bookId);
      } catch(e) {
        console.error(e);
      }
    };
  
    
    // remove read book
    const removeRead = (bookId) => {
      if(!Auth.loggedIn()) {
        return false;
      }
  
      try {
        deleteReadBook({
          variables: {bookId: bookId}
        });
  
        const removedDeleted = savedRead.filter(id => id !== bookId);
  
        saveBookIds('save_read', [...removedDeleted]);
        setSavedRead([...removedDeleted]);
        // setDeletedReadBook(bookId);
      } catch(e) {
        console.error(e);
      }
    };

  return (
      <div>
      {Auth.loggedIn() && 
      <div className="buttons-container">
      {savedFavourites.find(id => id === gbookId) ? 
        <button 
        onClick={() => removeFavorite(gbookId)} 
        className="btn save-later w-full mb-2 mx-1 max-240 text-start px-4">
        <span className="me-3"><i className="fas fa-heart-broken"></i></span> Remove favourite</button> :
        <button 
        onClick={() => handleSaveFavourite(gbookId)} 
        className="btn save-later w-full mb-2 mx-1 max-240 text-start px-4">
        <span className="me-3"><i className="far fa-heart"></i></span> Mark as favourite</button>
      }
      {
        savedRead.find(id => id === gbookId) ?
        <button onClick={() => removeRead(gbookId)}
          className="btn save-later w-full mb-2 mx-1 max-240 text-start px-4">
        <span className="me-3"><i className="fas fa-times"></i></span> Remove read</button> :
        <button 
          onClick={() => handleSaveRead(gbookId)}
          className="btn save-later w-full mb-2 mx-1 max-240 text-start px-4">
          <span className="me-3"><i className="fas fa-check"></i></span> Mark as read</button>
      }
      </div>
    }
    </div>
  )
};