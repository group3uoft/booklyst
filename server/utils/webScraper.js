const axios = require('axios');
const cheerio = require("cheerio");

const getPrice = async function(isbn) {
  return new Promise(async (resolve, reject) => {
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
        let eBookPrice = "";
        let bookPrice = "";
        let hardCoverPrice = "";
        let paperBack = "";
        //Get book name
        let bookName = $('.product-details__description-container .product-description-container h1').attr('title');
        //book price without discount
        /*let bookPrice = $('.product-details__purchase-info-container .item-price__normal').text().split("$")[1];
        let priceOriginal = "";*/

        try {
          //book price without discount
          eBookPrice = $('.item-purchase__container div:contains("Kobo ebook")').closest('.item-purchase-container__price-and-format').find('.item-price__normal').text().split("$")[1].trim();
        } catch(err) {
          //If book has discount
          try {
            eBookPrice = $('.item-purchase__container div:contains("Kobo ebook")').closest('.item-purchase-container__price-and-format').find('.item-price__container span').text().split("$")[1].trim();
          }
          catch {
            eBookPrice = "Not Available";
          }
        }
        
        try {
          paperBack = $('.item-purchase__container div:contains("Paperback")').closest('span').find('.format-button__price').text().split("$")[1].trim();
        } 
        catch(err) {
          paperBack = "Not Available";

        }

        try {
          hardCoverPrice = $('.item-purchase__container div:contains("Hardcover")').closest('span').find('.format-button__price').text().split("$")[1].trim();
        } 
        catch(err) {
          hardCoverPrice = "Not Available";

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
        //If book has discount
        /*if (bookPrice === "") {
          //book price with discount
          try {
            bookPrice = $('.product-details__purchase-info-container .item-price__container span').text().split("$")[1].trim();
            priceOriginal = $('.product-details__purchase-info-container .item-price__container span').text().split("$")[2].split(/[a-z]/)[0].trim();
          }
          catch {
            bookPrice = "Not Available";
          }
        }*/
        //console.log("Axios", bookName, "E", eBookPrice, "Paper", paperBack, "Hard", hardCoverPrice, "final", bookPrice)
        //indigoPrice = 
        return {
          bookName: bookName,
          bookPrice: bookPrice,
          priceEbook: eBookPrice
        }
      })
      .catch(err => {
        return {
          bookName: "Not Available",
          bookPrice: "Not Available",
          priceEbook: "Not Available"
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
        //console.log("Axios Amazon", bookName, "Kindke", kindlePrice, "hard", hardCoverPrice, "paper",paperBack,"final", bookPrice)
        //amazonPrice = 
        return {
          bookName: bookName,
          bookPrice: bookPrice,
          priceEbook: kindlePrice
        }
      })
      .catch(err => {
        return {
          bookName: "Not Available",
          bookPrice: "Not Available",
          priceEbook: "Not Available"
        }
      });
    
    Promise.all([amazonPrice, indigoPrice])
      .then (async (promises) => {
        resolve ({
          amazon: promises[0],
          indigo: promises[1]
        });
      });
  })
}

module.exports = {getPrice};