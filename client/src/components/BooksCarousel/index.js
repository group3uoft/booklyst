import React from 'react';
import Slider from "react-slick";
import BookCard from '../BookCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function BooksCarousel({
  searchedBooks,
  savedFavourites,
  setSavedFavourites,
  savedRead,
  setSavedRead,
  setSearchedBooks}) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };


  return(
      <div className="mx-3">
        <Slider {...settings}>
          {searchedBooks &&
            searchedBooks.map((book) => (
          <BookCard 
            key={book.bookId}
            book={book}
            searchedBooks={searchedBooks}
            setSearchedBooks={setSearchedBooks}
            savedFavourites={savedFavourites}
            setSavedFavourites={setSavedFavourites}
            savedRead={savedRead} 
            setSavedRead={setSavedRead} />
      ))}
        </Slider>
      </div>
  )
};