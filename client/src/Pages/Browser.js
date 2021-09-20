import React, {useState, useEffect} from "react";
import  Swiper  from '../components/Swiper';
import { searchHandle } from "../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
function Browser() {
    const state = useSelector(state => state);
    // const dispatch = useDispatch();
  
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [searchInput, setSearchInput] = useState('new books');
  
 
    useEffect(() => {
      async function fetchData() {
        const data = await searchHandle(searchInput);
        await setSearchedBooks(data);
      }
  
      fetchData();
    }, [searchInput]);
  
    console.log(state);
    return (
        < div className="books-container container d-flex flex-wrap justify-content-center" > 
            <Swiper searchedBooks={searchedBooks} /> 
        </div>
    )
}

export default Browser
