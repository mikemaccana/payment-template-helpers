// Frequently used helper expressions http://docs.ractivejs.org/latest/expressions
module.exports = function(helpers){

	var notLessThanZero = function(amount){
		if ( amount < 0 ) {
			return 0
		}
		return amount
	}

	helpers.currencyToSymbol = function(currency){
		currency = currency.toUpperCase();
		var currencySymbols = {
			'GBP': '£',
			'USD': '$',
			'EUR': '€'
		}
		return currencySymbols[currency];
	}

	helpers.amountToDollarsCents = function(amount){
		// Return 2600 as 26
		if ( amount <= 0 ) {
			return 'FREE'
		}
		if ( amount % 100 === 0 ) {
			return amount / 100
		}
		return (amount/100).toFixed( 2 );
	}

	helpers.toDate = function(stripeDate){
		// Convert seconds since epoch to eg: 'Tue Jan 15 2016'
		return new Date(stripeDate * 1000).toString().split(' ').splice(0, 4).join(' ');
	}

	helpers.percentOff = function(percentageDiscount, amount){
		// Return a discounted version of amount
		return notLessThanZero(( 1 - percentageDiscount / 100 ) * amount);
	}

	helpers.amountOff = function(amountDiscount, amount){
		// Return a discounted version of amount
		return notLessThanZero(amount - amountDiscount);
	}
}
