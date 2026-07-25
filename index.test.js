const { test } = require('node:test');
const assert = require('node:assert');
const { getPrice } = require('./index');

test('pricing exposes the .price contract field the orders service consumes', () => {
  assert.strictEqual(getPrice().price, 100,
    'pricing must expose { price } — the orders service reads response.price');
});
