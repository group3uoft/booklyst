// get saved books from local storage
export const getSavedBookIds = (type) => {
  const savedBookIds = localStorage.getItem(type)
    ? JSON.parse(localStorage.getItem(type))
    : [];

  return savedBookIds;
};

// save book ids to local storage
export const saveBookIds = (type ,booksArray) => {
  if (booksArray.length) {
    localStorage.setItem(type, JSON.stringify(booksArray));
  } else {
    localStorage.removeItem(type);
  }
};

// remove books from local storage
export const removeBookId = (type ,bookId) => {
  const savedBookIds = localStorage.getItem(type)
    ? JSON.parse(localStorage.getItem(type))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem(type, JSON.stringify(updatedSavedBookIds));

  return true;
}