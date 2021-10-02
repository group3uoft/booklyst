const axios = require('axios');
const cheerio = require("cheerio");

const config = {
  method: 'GET',
  url: `https://www.chapters.indigo.ca/en-ca/books/name/1501171364-item.html`,
};

axios(config)
  .then(res => {
    return res.data;
  })
  .then(data => {
    //console.log(data)
    const $ = cheerio.load(data);

    let bookName = $('.product-details__description-container .product-description-container h1').attr('title');
    let bookPrice = $('.product-details__purchase-info-container .item-price__normal').text();
    let priceOriginal = "";

    if (bookPrice === "") {
      bookPrice = $('.product-details__purchase-info-container .item-price__container span').text().split("$")[1].trim();
      priceOriginal = $('.product-details__purchase-info-container .item-price__container span').text().split("$")[2].split(/[a-z]/)[0].trim();
    }
    console.log("Axios", bookName, bookPrice, priceOriginal)
  });

/*request({
  method: 'GET',
  url: 'https://www.chapters.indigo.ca/en-ca/books/name/1501171364-item.html'
}, (err, res, body) => {

  if (err) return console.error(err);

  let $ = cheerio.load(body);

  console.log($('.item-price__normal').text())
});*/

const config2 = {
  method: 'GET',
  url: `https://www.amazon.ca/s?i=stripbooks&rh=p_66%3A9783966554169&s=relevanceexprank&Adv-Srch-Books-Submit.x=34&Adv-Srch-Books-Submit.y=9&unfiltered=1&ref=sr_adv_b`,
};

axios(config2)
  .then(res => {
    return res.data;
  })
  .then(data => {
    //console.log(data)
    const $ = cheerio.load(data);

    let bookName = $('.celwidget h2 a span').text();
    let kindlePrice = $('a:contains("Kindle Edition")').closest('.a-spacing-none').find('.a-offscreen').text().split("$")[1].trim();

    let hardCoverPrice = $('a:contains("Hardcover")').closest('.a-spacing-mini').find('.a-offscreen').text().split("$")[1] || 
    $('a:contains("Paperback")').closest('.a-spacing-mini').find('.a-offscreen').text().split("$")[1];
    /*if (bookPrice === "") {
      bookPrice = $('.product-details__purchase-info-container .item-price__container span').text().split("$")[1].trim();
      priceOriginal = $('.product-details__purchase-info-container .item-price__container span').text().split("$")[2].split(/[a-z]/)[0].trim();
    }*/
    console.log("Axios Amazon", bookName, kindlePrice, hardCoverPrice)
  });
