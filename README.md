# Payment Template Helpers

[![Build Status](https://travis-ci.org/mikemaccana/payment-template-helpers.png)](https://travis-ci.org/mikemaccana/payment-template-helpers)

## Installation

Presents payment information in any JavaScript-based templating language (frontend of backend). See the Methods section below. The code is pretty simple, the main value add is the unit tests. 

## Usage

    var paymentTemplateHelpers = require('payment-template-helpers');

paymentTemplateHelpers takes a single argument, `helpers` which is an object to be extended with the helper methods. 

For example, using __ractive.js__:

    paymentTemplateHelpers(Ractive.defaults.data)

### Methods

`amountToDollarsCents` returns a string representation of some amount of money. If the amount ends in 00, it will just show the major units. If the amount is less than or equal to 0, it will return 'FREE'. It has the following options:

 - __amount__ Number, required. Amount of money in minor units (cents, Eurocents, etc)


`percentOff` returns a discounted amount, never less than 0.

 - __percentageDiscount__ Number, required. A percentage, in whole number.
 - __amount__ Number, required. Amount of money in minor units (cents, Eurocents, etc)


`amountOff` returns a discounted amount, never less than 0.

 - __percentageDiscount__ Number, required. Discount in minor units (cents, Eurocents, etc)
 - __amount__ Number, required. Amount of money in minor units (cents, Eurocents, etc)

## TODO

Support currencies with more than two digits for minor units.

## Tests

Run `mocha`
