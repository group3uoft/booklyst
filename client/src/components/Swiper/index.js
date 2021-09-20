// Import Swiper React components

import React, {useState, useEffect} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './index.css'
import BookCard from "../BookCard"
// import { useSelector, useDispatch } from "react-redux";
// import SwiperCore from 'swiper';
// import BookCard from '../components/BookCard';
// import { UPDATE_CURRENT_SEARCH, UPDATE_HISTORY } from "../utils/actions";
// Import Swiper styles
 import 'swiper/swiper.scss';
 import 'swiper/components/navigation/navigation.scss'
 import './index.css'
//  import 'swiper/components/navigation/pagination.scss'
//  import 'swiper/components/navigation/scrollbar.scss'
import SwiperCore, { Pagination, Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);


export default ({searchedBooks}) => {
 
  

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      slidesPerGroup={3}
      loop={true}
      loopFillGroupWithBlank={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      className="mySwiper"
    >
      {searchedBooks &&
        searchedBooks.map((book) => (
          <SwiperSlide key={book.bookId}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      ...
    </Swiper>
  );
};