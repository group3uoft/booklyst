// https://www.googleapis.com/books/v1/volumes?q=query
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`);
};