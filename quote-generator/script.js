const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loading spinner shown
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Remove loading spinner
function completed() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

// Get quote from API
async function getQuotes() {
	// const proxyURL = 'https://cors-anywhere.herokuapp.com/';
	loading();
	const apiURL =
		'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

	try {
		const response = await fetch(apiURL);
		const data = await response.json();
		// check if author data is null and replaced with default "Unknown"
		if (!data.quoteAuthor) {
			authorText.innerText = 'Unknown';
		} else {
			authorText.innerText = data.quoteAuthor;
		}
		// Dynamically reduce font size if data.quoteText.length more than 100 characters
		if (data.quoteText.length > 100) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}
		quoteText.innerText = data.quoteText;
		completed();
		// console.log(data.quoteText);
		// console.log(data.quoteAuthor);
	} catch (error) {
		// handle error
		console.log(error);
		getQuotes();
	}
}

// Tweet Quote
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterURL, '_blank');
}

// Event Listener
newQuoteButton.addEventListener('click', getQuotes);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getQuotes();
