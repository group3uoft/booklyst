import React, { useEffect } from "react";
import bgImg from '../../assets/images/hero-bg.jpg'
import { searchGoogleBooks } from "../../utils/API";

export default function Hero({setSearchedBooks, setSearchInput, searchInput, setSearchHistory}) {

  const searchHandle = async (query) => {
    if(!query) {
      alert('please enter a query!');
    }
    // get results form google api
    try {
      const gResponse = await(searchGoogleBooks(query));

      if(!gResponse.ok) {
        throw new Error('Something went wrong!');
      }

      const gBookData = await gResponse.json();

      console.log(gBookData);

      const gBooks = gBookData.items.map(book => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        isbn13: book.volumeInfo.industryIdentifiers?.[0].identifier || ''
        }
      ));

      await setSearchedBooks(gBooks);
    } catch (e) {
      console.error(e);
    }
  } 

  const searchSubmit = (e) => {
    e.preventDefault();
    // run the search
    searchHandle(searchInput);
    setSearchHistory(searchInput);
  }

  useEffect(() => {
    searchHandle('new books');
  }, []);

  return(
    <div className="d-flex justify-content-center align-items-center hero-bg" style={{backgroundImage: `url(${bgImg})`}}>
      <div className="search-container d-flex justify-content-center">
        <form className="d-flex" onSubmit={searchSubmit}>
          <div className="input-container d-flex">
            <input 
            className="form-control mr-sm-2" 
            type="search" 
            placeholder="Search books, ISBN, Author" 
            aria-label="Search" 
            onChange={(e) => setSearchInput(e.target.value)}
            />
            <span className="btn btn-light mx-2 sp-btn"><i className="fas fa-camera"></i></span>
            <span className="btn btn-light sp-btn"><i className="fas fa-microphone-alt"></i></span>
          </div>
          <button className="btn btn-theme mx-2">Search</button>
        </form>
      </div>
    </div>
  )
};

