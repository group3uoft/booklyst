// https://www.googleapis.com/books/v1/volumes?q=query
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`);
};

export const searchCurrentBook = (bookId) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
}

// search based on category + newst 
export const searchRealatedBooks = (category, author) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=+inauthor:${author}+subject:${category}&orderBy=newest`);
}

export const searchByCategories = (category) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=+subject:${category}&orderBy=newest&maxResults=12`);
}

