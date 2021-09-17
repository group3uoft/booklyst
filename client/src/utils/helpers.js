import { searchGoogleBooks } from "./API";

// Search handle function
export const searchHandle = async (query) => {
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

    console.log(gBookData);

    const gBooks = gBookData.items.map(book => ({
      bookId: book.id,
      authors: book.volumeInfo.authors || ['No author to display'],
      title: book.volumeInfo.title,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks?.thumbnail || '',
      isbn13: book.volumeInfo.industryIdentifiers?.[0].identifier || ''
      }
    ));

    return gBooks;
  } catch (e) {
    console.error(e);
  }
} 


// function for mobile toggle 
export const mobileMenuToggle = () => {
  const navContainer = document.querySelector('.navbar');
  const navIcon = document.querySelector('#mobile-nav-icon');

  if(navContainer.className.includes('nav-hide')) {
    navContainer.classList.add('nav-show');
    navIcon.classList.add('nav-open');
    navContainer.classList.remove('nav-hide');
  } else {
    navIcon.classList.remove('nav-open');
    navContainer.classList.remove('nav-show');
    navContainer.classList.add('nav-hide');
  }
}