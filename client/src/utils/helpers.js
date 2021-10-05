import { searchGoogleBooks, searchCurrentBook, searchRealatedBooks, searchByCategories } from "./API";

// checking isbn to make sure the correct isbn
function checkIsbn(isbnList) {
  const isbnObj = {
    isbn10 : '',
    isbn13 : ''
  }

  isbnList.forEach(isbn => {
    if(isbn.type === 'ISBN_10') {
      isbnObj.isbn10 = isbn.identifier;
    } else if(isbn.type === 'ISBN_13') {
      isbnObj.isbn13 = isbn.identifier;
    }
  });

  return isbnObj;
}

// Search handle function
export const deepSearchHandle = async (query, type) => {
  if(!query) {
    alert('please enter a query!');
  }
  // get results form google api
  try {
    const gResponse = await(searchGoogleBooks(query));

    if(!gResponse.ok) {
      throw new Error('Something went wrong!');
    }

    const gBookData = await gResponse.json();

    if(gBookData.totalItems > 0) {

    const gBooks = gBookData.items.map((book) => {

      let isbnObj = {
        isbn13: '',
        isbn10: ''
      };

      if(book.volumeInfo.industryIdentifiers) {
        isbnObj = checkIsbn(book.volumeInfo.industryIdentifiers);
      }

      return {
        bookId: book.id,
        authors: book.volumeInfo.authors || [],
        title: book.volumeInfo.title || 'No Title Available',
        description: book.volumeInfo.description || '',
        categories: book.volumeInfo?.categories || [],
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        isbn13: isbnObj.isbn13,
        isbn10: isbnObj.isbn10,
        webReaderLink: book.accessInfo?.webReaderLink || '',
        googleListPrice: book.saleInfo.listPrice?.amount.toString() || '',
        googleRetailPrice: book.saleInfo.retailPrice?.amount.toString() || '',
        googlePlayBooks: book.volumeInfo?.infoLink || '',
        googleRatings: book.volumeInfo?.averageRating || 0,
        publishedDate: book.volumeInfo.publishedDate || '',
        publisher: book.volumeInfo.publisher || ''
        }
    });

    return gBooks;
    }
  } catch (e) {
    console.error(e);
  }
}; 

// fetch retatedBook Details
export const fetchRelatedBooks = async (category, authors) => {
  if(!authors && !category) {
    console.error('No data to find match');
  }
  // get results form google api
  try {
    const gResponse = await(searchRealatedBooks(category, authors));

    if(!gResponse.ok) {
      throw new Error('Something went wrong!');
    }

    const totalReturned = await gResponse.json();

    if(totalReturned.totalItems !== 0) {

      const dups = new Set();
      const gBookData = totalReturned.items.filter(book => {
        const duplicate = dups.has(book.volumeInfo.title);
        dups.add(book.volumeInfo.title);
        return !duplicate;
      })

        const gBooks = gBookData.map((book) => {

        let isbnObj = {
          isbn13: '',
          isbn10: ''
        };

        if(book.volumeInfo.industryIdentifiers) {
          isbnObj = checkIsbn(book.volumeInfo.industryIdentifiers);
        }
        return {
          bookId: book.id,
          authors: book.volumeInfo.authors || [],
          title: book.volumeInfo.title || 'No Title Available',
          description: book.volumeInfo.description || '',
          categories: book.volumeInfo?.categories || [],
          image: book.volumeInfo.imageLinks?.thumbnail || '',
          isbn13: isbnObj.isbn13,
          isbn10: isbnObj.isbn10,
          webReaderLink: book.accessInfo?.webReaderLink || '',
          googleListPrice: book.saleInfo.listPrice?.amount.toString() || '',
          googleRetailPrice: book.saleInfo.retailPrice?.amount.toString() || '',
          googlePlayBooks: book.volumeInfo?.infoLink || '',
          googleRatings: book.volumeInfo?.averageRating || 0,
          publishedDate: book.volumeInfo.publishedDate || '',
          publisher: book.volumeInfo.publisher || ''
          }
      });
      return gBooks;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
  }
}; 

// search by categories
export const deepSearchCategories = async (category) => {
  if(!category) {
    alert('please enter a category!');
  }
  // get results form google api
  try {
    const gResponse = await(searchByCategories(category));

    if(!gResponse.ok) {
      throw new Error('Something went wrong!');
    }

    const gBookData = await gResponse.json();

    if(gBookData) {
      const gBooks = gBookData.items.map((book) => {

        let isbnObj = {
          isbn13: '',
          isbn10: ''
        };

        if(book.volumeInfo.industryIdentifiers) {
          isbnObj = checkIsbn(book.volumeInfo.industryIdentifiers);
        }
  
        return {
          bookId: book.id,
          authors: book.volumeInfo.authors || [],
          title: book.volumeInfo.title || 'No Title Available',
          description: book.volumeInfo.description || '',
          categories: book.volumeInfo?.categories || [],
          image: book.volumeInfo.imageLinks?.thumbnail || '',
          isbn13: isbnObj.isbn13,
          isbn10: isbnObj.isbn10,
          webReaderLink: book.accessInfo?.webReaderLink || '',
          googleListPrice: book.saleInfo.listPrice?.amount.toString() || '',
          googleRetailPrice: book.saleInfo.retailPrice?.amount.toString() || '',
          googlePlayBooks: book.volumeInfo?.infoLink || '',
          googleRatings: book.volumeInfo?.averageRating || 0,
          publishedDate: book.volumeInfo.publishedDate || '',
          publisher: book.volumeInfo.publisher || ''
          }
      });
  
      return gBooks;
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
  }
}; 

// fetch currectBook Details
export const fetchCurrentBook = async (bookId) => {
  if(!bookId) {
    alert('book ID is invalid');
  }
  // get results form google api
  try {
    const gResponse = await(searchCurrentBook(bookId));

    if(!gResponse.ok) {
      throw new Error('Something went wrong!');
    }

    const book = await gResponse.json();

    let isbnObj = {
      isbn13: '',
      isbn10: ''
    };

    if(book.volumeInfo.industryIdentifiers) {
      isbnObj = checkIsbn(book.volumeInfo.industryIdentifiers);
    }

      const gBookData =  {
        bookId: book.id,
        authors: book.volumeInfo.authors || [],
        title: book.volumeInfo.title || 'No Title Available',
        description: book.volumeInfo.description || '',
        categories: book.volumeInfo?.categories || [],
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        isbn13: isbnObj.isbn13,
        isbn10: isbnObj.isbn10,
        webReaderLink: book.accessInfo?.webReaderLink || '',
        googleListPrice: book.saleInfo.listPrice?.amount.toString() || '',
        googleRetailPrice: book.saleInfo.retailPrice?.amount.toString() || '',
        googlePlayBooks: book.volumeInfo?.infoLink || '',
        googleRatings: book.volumeInfo?.averageRating || 0,
        publishedDate: book.volumeInfo.publishedDate || '',
        publisher: book.volumeInfo.publisher || ''
        }

    return gBookData;
  } catch (e) {
    console.error(e);
  }
}

// filter the current book
export const filterSavingBook = (searchedBooks, bookId) => {

  const saveBookDetails = searchedBooks.find(book => book.bookId === bookId);

  const bookToSave = {
    bookId: saveBookDetails.bookId,
    authors: saveBookDetails.authors,
    title: saveBookDetails.title,
    description: saveBookDetails.description,
    categories: saveBookDetails.categories,
    image: saveBookDetails.image,
    isbn13: saveBookDetails.isbn13,
    isbn10: saveBookDetails.isbn10,
    webReaderLink: saveBookDetails.webReaderLink,
    googleListPrice: saveBookDetails.googleListPrice,
    googleRetailPrice: saveBookDetails.googleListPrice,
    googlePlayBooks: saveBookDetails.googlePlayBooks,
    googleRatings: saveBookDetails.googleRatings,
    publishedDate: saveBookDetails.publishedDate,
    publisher: saveBookDetails.publisher
  }

  return bookToSave;
};

export const favouriteCategories = (fav, read) => {
  const allBooks = [...fav, ...read];

  const allCats = [];
  
  allBooks.forEach(book => {
    if(book.categories.length > 0) {
      allCats.push(book.categories[0]);
    }
    return;
  });

  const uniq = allCats
  .map((name) => {
    return {
      count: 1,
      name: name
    }
  })
  .reduce((a, b) => {
    a[b.name] = (a[b.name] || 0) + b.count
    return a
  }, {})

  const favourites = Object.keys(uniq).filter((a) => uniq[a] > 1);

  return favourites;
};

// function for mobile toggle 
export const mobileMenuToggle = () => {
  const navContainer = document.querySelector('.navbar');
  const navIcon = document.querySelector('#mobile-nav-icon');
  const logoContainer = document.querySelector('.login-container');
  const navBarContainer = document.querySelector('.navbar-nav');

  if(navContainer.className.includes('nav-hide')) {
    navContainer.classList.add('nav-show');
    navIcon.classList.add('nav-open');
    navContainer.classList.remove('nav-hide');
    logoContainer.classList.remove('d-mob-none');
    navBarContainer.classList.remove('d-mob-none');
  } else {
    navIcon.classList.remove('nav-open');
    navContainer.classList.remove('nav-show');
    navContainer.classList.add('nav-hide');
    logoContainer.classList.add('d-mob-none');
    navBarContainer.classList.add('d-mob-none');
  }
}
