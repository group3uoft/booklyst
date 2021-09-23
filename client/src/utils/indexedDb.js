export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the database `shop-shop` with the version of 1
    const request = window.indexedDB.open(`booklyst`, 1);

    // create variables to hold the reference to the database, transaction (tx), and object store
    let db, tx, store;

    // if version has changed (or if this is the first time using the database), run this method and create three object store
    request.onupgradeneeded = function(e) {
      const db = request.result;

      // create ibject store for each tyoe of data and set "primary" key index to be the `_id` of the data
      db.createObjectStore('allbooks', {keyPath: 'bookId'});
      db.createObjectStore('readbooks', {keyPath: 'bookId'});
      db.createObjectStore('savedbooks', {keyPath: 'bookId'});
      db.createObjectStore('searchHistory', {keyPath: 'bookId'});
    };

    // handle any errors with connecting
    request.onerror = function(e) {
      console.errot(e);
    }

    // on databse open success
    request.onsuccess = function(e) {
      // save a reference of the database to the `db` variable
      db = request.result;
      // open a transaction do whatever we pass into `storeName` (must match one of the object store names)
      tx = db.transaction(storeName, 'readwrite');
      // save a reference to that object store
      store = tx.objectStore(storeName);

      // if there's any errors, handle it
      db.onerror = function(e) {
        console.error(e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get': 
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete': 
          store.delete(object._id);
          break;
        default: 
          console.error('No valid method!');
          break;
      }

      // when the transaction is complete, close the connection'
      tx.oncomplete = function() {
        db.close();
      }
    }
  });
}