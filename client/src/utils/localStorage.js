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

// save quick note
export const saveQuickNote = (note) => {
  if(note && note.length > 0) {
    localStorage.setItem('quick_note', JSON.stringify(note));
  } else {
    localStorage.removeItem('quick_note');
  }
}

// get saved books from local storage
export const getQuickNote = () => {
  const savedBookIds = localStorage.getItem('quick_note')
    ? JSON.parse(localStorage.getItem('quick_note'))
    : 'Currently reading...';

  return savedBookIds;
};