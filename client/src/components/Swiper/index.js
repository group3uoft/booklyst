// Import Swiper React components

import React, {useState, useEffect} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import BookCard from "../BookCard"
// import { useSelector, useDispatch } from "react-redux";
// import SwiperCore from 'swiper';
// import BookCard from '../components/BookCard';
// import { UPDATE_CURRENT_SEARCH, UPDATE_HISTORY } from "../utils/actions";
// Import Swiper styles
 import 'swiper/swiper.scss';
 import 'swiper/components/navigation/navigation.scss'
//  import 'swiper/components/navigation/pagination.scss'
//  import 'swiper/components/navigation/scrollbar.scss'



export default ({searchedBooks}) => {
 


  return (
    <Swiper
       spaceBetween={50}
      slidesPerView={4}
      navigation
    //   pagination={{clickable:true}}
     // scrollbar={{draggble:true}}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      // style={{padding:'5rem'}}
    >
    {searchedBooks && searchedBooks.map((book) => (
          <SwiperSlide key={book.bookId}><BookCard book={book} /></SwiperSlide>
        ))}
     
      
      ...
    </Swiper>
  );
};

