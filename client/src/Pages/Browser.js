// Import Swiper React components

import React, {useState, useEffect} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from "react-redux";
import SwiperCore from 'swiper';
import BookCard from '../components/BookCard';
import { UPDATE_CURRENT_SEARCH, UPDATE_HISTORY } from "../utils/actions";
// Import Swiper styles
 import 'swiper/swiper.scss';
 import 'swiper/components/navigation/navigation.scss'
//  import 'swiper/components/navigation/pagination.scss'
//  import 'swiper/components/navigation/scrollbar.scss'



export default () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('new books');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    dispatch({
      type: UPDATE_CURRENT_SEARCH,
      currentSearch: searchedBooks
    });

  }, [searchedBooks]);

  console.log(state);
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={4}
      navigation
    //   pagination={{clickable:true}}
      scrollbar={{draggble:true}}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
};

