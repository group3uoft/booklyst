import React, { useEffect } from "react";
import bgImg from '../../assets/images/hero-bg.jpg'
import { searchHandle } from "../../utils/helpers";

export default function Hero({setSearchedBooks, setSearchInput, searchInput, setSearchHistory}) {

  const searchSubmit = async (e) => {
    e.preventDefault();
    // run the search
    const data = await searchHandle(searchInput);
    await setSearchedBooks(data);
    setSearchHistory(searchInput);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await searchHandle(searchInput);
      await setSearchedBooks(data);
    }

    fetchData();
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

