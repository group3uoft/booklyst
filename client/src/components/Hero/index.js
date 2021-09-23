import React, { useEffect, useState } from "react";
import bgImg from '../../assets/images/hero-bg.jpg'
import { deepSearchHandle } from "../../utils/helpers";
import ImageUpload from "../UploadImage";

export default function Hero({setSearchedBooks, setSearchInput, searchInput, setSearchHistory, searchedBooks}) {

  const [imageLoading, setImageLoading] = useState("");

  const searchSubmit = async (e) => {
    e.preventDefault();
    const query = e.target[0].value;
    // run the search
    setSearchInput(query);
    const data = await deepSearchHandle(query);
    await setSearchedBooks(data);
    setSearchHistory(query);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await deepSearchHandle(searchInput);
      await setSearchedBooks(data);
    }
    if(!searchedBooks || searchedBooks.length === 0) {
      fetchData();
    }
  }, [searchInput, setSearchInput, setSearchedBooks, searchedBooks]);

  return(
    <div className="d-flex justify-content-center align-items-center hero-bg" style={{backgroundImage: `url(${bgImg})`}}>
      <div className="search-container d-flex justify-content-center flex-column p-4">
        <form className="d-flex" onSubmit={searchSubmit}>
          <div className="input-container d-flex">
            <input 
            className="form-control mr-sm-2" 
            name="search"
            type="search" 
            placeholder="Search books, ISBN, Author" 
            aria-label="Search" 
            // value={imageLoading}
            // onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button className="btn btn-theme mx-2">Search</button>
        </form>
        <div className="m-1">
          <p className="m-1 fs-3">Or you can search using</p>
        </div>
        <div className="d-flex">
          {/* <ImageUpload 
            setImageLoading={setImageLoading}
          /> */}
          <span className="btn btn-light sp-btn w-100 border-input"><i className="fas fa-microphone-alt"></i></span>
        </div>
      </div>
    </div>
  )
};

