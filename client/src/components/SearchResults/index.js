import React, {useState} from "react";
import BookCard from "../BookCard";
import Spinner from "../Spinner";

import { saveBookIds, getSavedBookIds } from '../../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_FAVOURITE } from '../../utils/mutations';
import Auth from '../../utils/auth';

import { useSelector, useDispatch } from "react-redux";

export default function SearchResults({searchedBooks, searchInput}) {

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  // saveFavourites in localStorage 
  const [savedFavourites, setSavedFavourites] = useState(getSavedBookIds('save_favourites'));
  const [savedRead, setSavedRead] = useState(getSavedBookIds('save_read'));

  // mutation to save favourite
  const [saveFavourite] = useMutation(SAVE_FAVOURITE);

  const handleSaveFavourite = async (bookId) => {
    const bookDetails = state.currentSearch.find(book => book.bookId === bookId);

    const bookInfo = {
      bookId : bookDetails.bookId,
      authors: bookDetails.authors,
      title: bookDetails.title,
      description: bookDetails.description,
      categories: bookDetails.categories,
      image: bookDetails.image,
      isbn13: bookDetails.isbn13,
      isbn10: bookDetails.isbn10,
      webReaderLink: bookDetails.webReaderLink,
      googlePlayBooks: bookDetails.googlePlayBooks,
      googleRatings: bookDetails.googleRatings,
      publishedDate: bookDetails.publishedDate,
      publisher: bookDetails.publisher
    }

    if(!Auth.loggedIn()) {
      console.log('not logged in');
      return false;
    }

    console.log('statefrombookcard', bookInfo);

    try {
      await saveFavourite({
        variables: { input: bookInfo}
      });

      setSavedFavourites('save_favourites', [...savedFavourites, bookDetails.bookId]);
    } catch (e) {
      console.log(e)
    }
  }; 

  if(searchedBooks.length === 0) {
    return (
      <Spinner />
    )
  }

  return (
    <div className="container">
      <h1 className="text-center m-4">{searchInput === 'new books' ? `Deals of the Day!`: `Search Results...`}</h1>
      <div className="books-container container d-flex flex-wrap justify-content-center">
        {searchedBooks && searchedBooks.map((book) => (
          <BookCard 
            book={book}
            handleSaveFavourite={handleSaveFavourite}
            key={book.bookId}/>
        ))}
      </div>
    </div>
  )
}