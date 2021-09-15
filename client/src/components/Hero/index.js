import React, { useState, useEffect } from "react";
import bgImg from '../../assets/images/hero-bg.jpg'
import { searchGoogleBooks } from "../../utils/API";

export default function Hero({setSearchedBooks}) {

  const [searchInput, setSearchInput] = useState('harry potter');

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
  }

  useEffect(() => {
    searchHandle('new books');
  }, []);

  return(
    <div className="d-flex justify-content-center align-items-center hero-bg" style={{backgroundImage: `url(${bgImg})`}}>
      <div className="search-container d-flex justify-content-center">
        <form className="d-flex" onSubmit={searchSubmit}>
          <input 
            className="form-control mr-sm-2" 
            type="search" 
            placeholder="Search books, ISBN, Author" 
            aria-label="Search" 
            style={{minWidth: '400px', minHeight: '50px'}}
            onChange={(e) => setSearchInput(e.target.value)}
            ></input>
          <button className="btn btn-light mx-2" style={{minWidth:'60px'}}><i className="fas fa-camera"></i></button>
          <button className="btn btn-light" style={{minWidth:'60px'}}><i className="fas fa-microphone-alt"></i></button>
          <button className="btn btn-theme mx-2">Search</button>
        </form>
      </div>
    </div>
  )
};

