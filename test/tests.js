// Tests. Mocha TDD/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html

var assert = require('assert')

var helpers = require('../index.js');

var log = console.log.bind(console)

suite('payment-template', function(){

	suite('symbols', function(){
		test('turns currencies into symbols', function(){
			assert.equal(helpers.currencyToSymbol('USD'), '$');
		});
		test("shows 'USD ' for dollars in Australia", function(){
			assert.equal(helpers.currencyToSymbol('USD', 'AU'), 'USD ');
		});
	});

	suite('presenting amounts', function(){
		test('Handles 0 accurately', function(){
			assert.equal(helpers.amountToDollarsCents(0), 'FREE');
		});
		test('Handles negative numbers accurately', function(){
			assert.equal(helpers.amountToDollarsCents(-23), 'FREE');
		});
		test('Handles cents accurately', function(){
			assert.equal(helpers.amountToDollarsCents(2382), '23.82');
		});
		test('Drops cents when even', function(){
			assert.equal(helpers.amountToDollarsCents(2300), '23');
		});
	});

	suite('discounts', function(){
		test('handles percentOff', function(){
			assert.equal(helpers.percentOff(30,100), 70);
		});
		test('handles crazy discounts in percent', function(){
			assert.equal(helpers.percentOff(110,100), 0);
		});
		test('handles discounts in amount', function(){
			assert.equal(helpers.amountOff(7,100), 93);
		});
		test('handles crazy discounts in amount', function(){
			assert.equal(helpers.amountOff(110,100), 0);
		});
	});

	suite('prorating', function(){
		var date = new Date('2018-04-19T15:10:03.497Z')
		var fakeNowDate = new Date('2017-04-19T15:10:03.497Z')

		test('days until works', function(){
			var daysUntil = helpers.getDaysUntil(date, fakeNowDate)
			assert.equal(daysUntil, 365)
		});

		test('getProRatedPrice works', function(){
			var proRatedPrice = helpers.getProRatedPrice(9900, date, 2, fakeNowDate)
			assert.equal(proRatedPrice, 19800)
		})
	})


});


