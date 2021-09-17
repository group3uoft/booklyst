import React from "react";

export default function BookCard({book}) {
  return (
    <div
    className="book-card card m-2"
    style={{minWidth: '220px', maxWidth: '250px', minHeight: '200px'}}>
      <div 
        className="card-img-top d-flex justify-content-center align-items-center"
        style={{minHeight: '193px'}}>
        <img 
        className="card-image" 
        src={book.image ? book.image : `https://picsum.photos/128/193`} 
        alt="Card cap"
        />
      </div>
      <div className="card-body">
        <h5 
          className="card-title book-title"
          style={{minHeight: '45px'}}>{book.title}</h5>
        <p className="card-text book-desc">{book.description}</p>
        <div className="buttons-container d-flex flex-wrap justify-content-center">
          <a href={`https://www.amazon.com/s?i=stripbooks&rh=p_66%3A${book.isbn13}&s=relevanceexprank&Adv-Srch-Books-Submit.x=34&Adv-Srch-Books-Submit.y=9&unfiltered=1&ref=sr_adv_b`} target="_blank" rel="noreferrer" className="btn amazon-btn mb-2">Buy Now from Amazon</a>
          <a href={`https://www.chapters.indigo.ca/en-ca/books/name/${book.isbn13}-item.html`} target="_blank" rel="noreferrer" className="btn indigo-btn mb-2">Buy it now from Indigo</a>
          <div className="buttons-container">
            <button className="btn save-later mx-1">Favourites</button>
            <button className="btn save-later">Mark read</button>
          </div>
        </div>
      </div>
    </div>
  )
}