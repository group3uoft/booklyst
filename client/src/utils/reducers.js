import {
  UPDATE_BOOKS,
  UPDATE_HISTORY,
  UPDATE_CURRENT_SEARCH,
  UPDATE_READ_BOOKS,
  ALL_BOOKS
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case ALL_BOOKS:
      // const booksToSave = action.allbooks.map(book => {
      //   console.log([...state.allbooks]);
      //   console.log(state.allbooks.find(stateBook => stateBook.bookId !== book.bookId));
      // });
      return {
        ...state,
        allbooks: [...state.allbooks, ...action.allbooks]
      }

    case UPDATE_BOOKS: 
      return {
        ...state,
        savedBooks: [...action.savedBooks]
      };

    case UPDATE_HISTORY: 
      return {
        ...state,
        searchHistory: [...state.searchHistory, ...action.searchHistory]
      }

    case UPDATE_CURRENT_SEARCH: 
      return {
        ...state,
        currentSearch: [...action.currentSearch]
      }

    case UPDATE_READ_BOOKS: 
      return {
        ...state,
        readBooks: [...action.readBooks]
      }

    default: 
    return state;
  }
}