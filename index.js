var log = console.log.bind(console);

require('agave')();

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

var floor = Math.floor.bind(Math);

var currencyToSymbol = function(currency, countryCode){
	currency = currency.toUpperCase();
	var currencySymbols = {
		'GBP': '£',
		'USD': '$',
		'EUR': '€'
	}
	if ( currencySymbols[currency] === '$' ) {
		if ( NON_US_DOLLAR_COUNTRIES.includes(countryCode) ) {
			return 'USD '
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
		return floor((amount/100).toFixed( 2 ));
	}
	return (amount/100).toFixed( 2 );
}

var getDaysUntil = function(date, fakeNowDate){
	var now = new Date();
	if ( fakeNowDate ) {
		now = new Date(fakeNowDate)
	}
	return floor((date - now) / 1..day);
}

// yearlyPrice yearly price, minor units
// expiry String final date
// multiplier NUmber for numtuple products
// fakeDate String fake date for 'now' (used for unit testing)
var getProRatedPrice = function(yearlyPrice, expiry, multiplier, fakeNowDate) {
	if ( ! multiplier ) {
		multiplier = 1
	}
	var daysLeft = getDaysUntil(expiry, fakeNowDate);
	var proRatedPrice = floor(yearlyPrice / 365 * daysLeft * multiplier);
	return proRatedPrice;
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
	getDaysUntil,
	getProRatedPrice,
	toDate,
	percentOff,
	amountOff
}
