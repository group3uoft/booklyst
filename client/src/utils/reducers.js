import {
  UPDATE_BOOKS,
  UPDATE_HISTORY,
  UPDATE_CURRENT_SEARCH,
  UPDATE_READ_BOOKS
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_BOOKS: 
      return {
        ...state,
        savedBooks: [...action.savedBooks]
      };

    case UPDATE_HISTORY: 
      // const duplicateIndex = state.searchHistory.indexOf(...action.searchHistory);
      // const dupState = [...state.searchHistory];
      // dupState.splice(duplicateIndex, 1);
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