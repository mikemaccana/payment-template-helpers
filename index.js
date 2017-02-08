var SECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

var log = console.log.bind(console)

// Frequently used helper expressions http://docs.ractivejs.org/latest/expressions

// From https://en.wikipedia.org/wiki/Dollar
// United States, Canada, Australia, Taiwan, Hong Kong, Singapore, New Zealand, Liberia, Jamaica and Namibia.
const NON_US_DOLLAR_COUNTRIES = ['AU', 'CA', 'TW', 'HK', 'SG', 'NZ', 'LR', 'JM', 'NA']

var notLessThanZero = function(amount){
	if ( amount < 0 ) {
		return 0
	}
	return amount
}

var currencyToSymbol = function(currency, countryCode){
	currency = currency.toUpperCase();
	var currencySymbols = {
		'GBP': '£',
		'USD': '$',
		'EUR': '€'
	}
	if ( currencySymbols[currency] === '$' ) {
		if ( NON_US_DOLLAR_COUNTRIES.includes(countryCode) ) {
			return 'USD'
		}
	}
	return currencySymbols[currency];
}

var amountToDollarsCents = function(amount, roundDown){
	// Return 2600 as 26
	if ( amount <= 0 ) {
		return 'FREE'
	}
	if ( amount % 100 === 0 ) {
		return amount / 100
	}
	if ( roundDown ) {
		return Math.floor((amount/100).toFixed( 2 ));
	} else {
		return (amount/100).toFixed( 2 );
	}
}

// yearlyPrice yearly price, minor units
// expiry String final date
// multiplier NUmber for numtuple products
// fakeDate String fake date for now (used for unit testing)
var getProRatedPrice = function(yearlyPrice, expiry, multiplier, fakeDate) {
	if ( ! multiplier ) {
		multiplier = 1
	}
	var now = new Date();
	if ( fakeDate ) {
		now = new Date(fakeDate)
	}
	var daysLeft = (expiry - now) / SECONDS_IN_A_DAY
	var proRatedPrice = yearlyPrice / 365 * daysLeft * multiplier;
	var proRatedPriceMajorUnits = amountToDollarsCents(proRatedPrice, true)
	return proRatedPriceMajorUnits
}

var toDate = function(stripeDate){
	// Convert seconds since epoch to eg: 'Tue Jan 15 2016'
	return new Date(stripeDate * 1000).toString().split(' ').splice(0, 4).join(' ');
}

var percentOff = function(percentageDiscount, amount){
	// Return a discounted version of amount
	return notLessThanZero(( 1 - percentageDiscount / 100 ) * amount);
}

var amountOff = function(amountDiscount, amount){
	// Return a discounted version of amount
	return notLessThanZero(amount - amountDiscount);
}

module.exports = {
	currencyToSymbol,
	amountToDollarsCents,
	getProRatedPrice,
	toDate,
	percentOff,
	amountOff
}
