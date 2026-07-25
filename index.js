// Pricing service. CONTRACT: getPrice() returns { price: <number> } — the orders
// service reads response.price. (Do not rename this field without updating consumers.)
function getPrice() {
  // BUG (deploy abc123): the response field was renamed price -> amount, breaking
  // the orders service which still reads .price. Restore the contract field name.
  return { amount: 100 };
}
module.exports = { getPrice };
