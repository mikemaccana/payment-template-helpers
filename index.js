var SECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

var log = console.log.bind(console)

// Frequently used helper expressions http://docs.ractivejs.org/latest/expressions

var notLessThanZero = function(amount){
	if ( amount < 0 ) {
		return 0
	}
	return amount
}

var currencyToSymbol = function(currency){
	currency = currency.toUpperCase();
	var currencySymbols = {
		'GBP': '£',
		'USD': '$',
		'EUR': '€'
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

var getProRatedPrice = function(yearlyPrice, expiry) {
	var now = new Date();
	var daysLeft = (expiry - now) / SECONDS_IN_A_DAY
	var proRatedPrice = yearlyPrice / 365 * daysLeft;
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
