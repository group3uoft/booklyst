import React, {useState, useEffect} from "react";
import { deepSearchCategories } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { getSavedBookIds } from '../utils/localStorage';
import Spinner from '../components/Spinner';

import { UPDATE_BOOKS, UPDATE_READ_BOOKS, ALL_BOOKS } from "../utils/actions";
import BooksCarousel from "../components/BooksCarousel";

function Browser() {
    const dispatch = useDispatch();

      // saveFavourites in localStorage 
    const [savedFavourites, setSavedFavourites] = useState(getSavedBookIds('save_favourites'));
    const [savedRead, setSavedRead] = useState(getSavedBookIds('save_read'));
    const [selfHelp, setSelfHelp] = useState([]);
    const [fiction, setFiction] = useState([]);
    const [thrillers, setThrillers] = useState([]);
    const [biography, setBiography] = useState([]);

    useEffect(() => {
      dispatch({
        type: UPDATE_BOOKS,
        savedBooks: savedFavourites
      })
    }, [savedFavourites, dispatch]);
    
    useEffect(() => {
      dispatch({
        type: UPDATE_READ_BOOKS,
        readBooks: savedRead
      })
    }, [savedRead, dispatch]);

    useEffect(() => {
      dispatch({
        type: ALL_BOOKS,
        allbooks: selfHelp,
      })
    }, [selfHelp, dispatch]);
    
    useEffect(() => {
      dispatch({
        type: ALL_BOOKS,
        allbooks: fiction,
      })
    }, [fiction, dispatch]);

    useEffect(() => {
      dispatch({
        type: ALL_BOOKS,
        allbooks: thrillers,
      })
    }, [thrillers, dispatch]);

    useEffect(() => {
      dispatch({
        type: ALL_BOOKS,
        allbooks: biography,
      })
    }, [biography, dispatch]);

    useEffect(() => {
      async function fetchData() {
        const selfHelp = await deepSearchCategories('self-help');
        await setSelfHelp(selfHelp);

        const fiction = await deepSearchCategories('fiction');
        await setFiction(fiction);

        const thrillers = await deepSearchCategories('thrillers');
        await setThrillers(thrillers);

        const biography = await deepSearchCategories('biography');
        await setBiography(biography);
      }
  
      fetchData();
    }, []);

    if(selfHelp.length === 0 || fiction.length === 0 ) {
      return (
        < Spinner />
      )
    }
  
    
    return (
      <div className="container mb-5">
        <h1 className="m-3 m-lg-5 ">Browse by Category</h1>
        <div className="container p-3" >
          <h2 className="text-center mb-5">Self-Help Books</h2>
          <BooksCarousel className="mb-5"
            searchedBooks={selfHelp}
            savedFavourites={savedFavourites}
            setSavedFavourites={setSavedFavourites}
            savedRead={savedRead} 
            setSavedRead={setSavedRead}
            setSearchedBooks={setSelfHelp}
          />

          <h2 className="text-center my-5">Fiction Books</h2>
          <BooksCarousel className="mb-5"
            searchedBooks={fiction}
            savedFavourites={savedFavourites}
            setSavedFavourites={setSavedFavourites}
            savedRead={savedRead} 
            setSavedRead={setSavedRead}
            setSearchedBooks={setFiction}
          />

          <h2 className="text-center my-5">Thriller Books</h2>
          <BooksCarousel className="mb-5"
            searchedBooks={thrillers}
            savedFavourites={savedFavourites}
            setSavedFavourites={setSavedFavourites}
            savedRead={savedRead} 
            setSavedRead={setSavedRead}
            setSearchedBooks={setThrillers}
          />

          <h2 className="text-center my-5">Biography Books</h2>
          <BooksCarousel className="mb-5"
            searchedBooks={biography}
            savedFavourites={savedFavourites}
            setSavedFavourites={setSavedFavourites}
            savedRead={savedRead} 
            setSavedRead={setSavedRead}
            setSearchedBooks={setBiography}
          />
      </div>
      </div>
    )
}

export default Browser
