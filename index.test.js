const { test } = require('node:test');
const assert = require('node:assert');
const { getPrice } = require('./index');

test('pricing exposes the .price contract field the orders service consumes', () => {
  const result = getPrice();
  assert.strictEqual(result.price, 100,
    'pricing must expose { price } — the orders service reads response.price');
  assert.strictEqual(result.unit, 'cents',
    'pricing must declare the unit explicitly so consumers can handle cents correctly');
});
