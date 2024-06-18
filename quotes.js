// Get access to HTML elements we nedd
const quoteBox = document.getElementById("quote-box");
const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");
const newQuote = document.getElementById("new-quote");
const postQuote = document.getElementById("tweet-quote");

// array object of quotes\
// const quotes = [
//     {quote: "History defines who you are.", author: "Jaywest"},
//     {quote: "Everything happens for reason.", author: "JohnWest"},
//     {quote: "When you thing you loose, trust me, at somehow and somewhere you won.", author: "Jean De Dieu"}
// ]

// function to handle the change of quotes

// const getRandomQuote = () => {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     return quotes[randomIndex];
// }

let quotesData;
var currentQuote = "";
var currentAuthor = "";

function getQuotes() {
    return $.ajax({
      headers: {
        Accept: 'application/json'
      },
      url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
      success: function (jsonQuotes) {
        if (typeof jsonQuotes === 'string') {
          quotesData = JSON.parse(jsonQuotes);
          console.log('quotesData');
          console.log(quotesData);
        }
      }
    });
  }

  function getRandomQuote() {
    return quotesData.quotes[
      Math.floor(Math.random() * quotesData.quotes.length)
    ];
  }
  function getQuote() {
    let randomQuote = getRandomQuote();
    currentQuote =randomQuote.quote;
    currentAuthor = randomQuote.author;
    $(quoteText).text(randomQuote.quote);
    $(quoteAuthor).text(randomQuote.author);
    $('#tweet-quote').attr('href','https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  }

  $(document).ready(function () {
    getQuotes().then(() => {
      getQuote();
    });
  
    $(newQuote).on('click', getQuote);
  });

// $(document).ready(function() {
//     $(newQuote).on('click', function() {
//         $.getJSON('http://api.forismatic.com/api/1.0/', function(data) {
//           $(quoteText).html(data.content);
//           $(quoteAuthor).html(data.content);  
//         });
//     });
// });