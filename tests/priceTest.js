import {formatCurrency} from '../scripts/utils/price.js';

console.log('test suite: formatCurrency');

console.log('testing with normal digits');

if (formatCurrency(2099) === '20.99') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('with zero input');

if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('with rounding the numbers');

if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}