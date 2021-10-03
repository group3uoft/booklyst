const axios = require('axios');
const cheerio = require("cheerio");

module.exports = {
  getPrice:async function(isbn) {
    //Get config for Indigo
    const config = {
      method: 'GET',
      url: `https://www.chapters.indigo.ca/en-ca/books/name/${isbn}-item.html`,
    };

    //let indigoPrice = {};
    //let amazonPrice = {};
    
    const indigoPrice = axios(config)
      .then(res => {
        return res.data;
      })
      .then(data => {
        //load html
        const $ = cheerio.load(data);
        //Get book name
        let bookName = $('.product-details__description-container .product-description-container h1').attr('title');
        //book price without discount
        let bookPrice = $('.product-details__purchase-info-container .item-price__normal').text();
        let priceOriginal = "";
        
        //If book has discount
        if (bookPrice === "") {
          //book price with discount
          try {
            bookPrice = $('.product-details__purchase-info-container .item-price__container span').text().split("$")[1].trim();
            priceOriginal = $('.product-details__purchase-info-container .item-price__container span').text().split("$")[2].split(/[a-z]/)[0].trim();
          }
          catch {
            bookPrice = "Not Available";
          }
        }
        console.log("Axios", bookName, bookPrice, priceOriginal)
        //indigoPrice = 
        return {
          bookName: bookName,
          bookPrice: bookPrice,
          priceEbook: ""
        }
      });

    const config2 = {
      method: 'GET',
      url: `https://www.amazon.ca/s?i=stripbooks&rh=p_66%3A${isbn}&s=relevanceexprank&Adv-Srch-Books-Submit.x=34&Adv-Srch-Books-Submit.y=9&unfiltered=1&ref=sr_adv_b`,
    };

    const amazonPrice = axios(config2)
      .then(res => {
        return res.data;
      })
      .then(data => {
        //console.log(data)
        const $ = cheerio.load(data);

        let bookName = "";
        let kindlePrice = "";
        let bookPrice = "";
        let hardCoverPrice = "";
        let paperBack = "";

        try {
          bookName = $('.celwidget h2 a span').text().trim();
        } catch(err) {
          bookName = "Not Available";
        }

        try {
          kindlePrice = $('a:contains("Kindle Edition")').closest('.a-spacing-none').find('.a-offscreen').text().split("$")[1].trim();
        } catch(err) {
          kindlePrice = "Not Available";
        }

        try {
          hardCoverPrice = $('a:contains("Hardcover")').closest('.a-spacing-mini').find('.a-offscreen').text().split("$")[1].trim();
        } catch(err) {
          hardCoverPrice = "Not Available";
        }

        try {
          paperBack = $('a:contains("Paperback")').closest('.a-spacing-mini').find('.a-offscreen').text().split("$")[1].trim();
        } catch(err) {
          paperBack = "Not Available";
        }

        if (hardCoverPrice === "Not Available" && paperBack === "Not Available") {
          bookPrice = "Not Available"
        } else {
          if (hardCoverPrice > paperBack) {
            bookPrice = paperBack;
          } else {
            bookPrice = hardCoverPrice;
          }
        }
        console.log("Axios Amazon", bookName, "Kindke", kindlePrice, "hard", hardCoverPrice, "paper",paperBack,"final", bookPrice)
        //amazonPrice = 
        return {
          bookName: bookName,
          bookPrice: bookPrice,
          priceEbook: kindlePrice
        }
      });
    
    const allPromise = Promise.all([amazonPrice, indigoPrice])
      .then (async (promises) => {
        console.log("zzzzz", {
          amazon: amazonPrice,
          indigo: indigoPrice.Promise
        })
        return {
          amazon: amazonPrice,
          indigo: indigoPrice
        }
      });
  }
  
}