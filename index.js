// Pricing service. CONTRACT: getPrice() returns { price: <number> } — the orders
// service reads response.price. (Do not rename this field without updating consumers.)
function getPrice() {
  // FIX: Restored contract field name from 'amount' back to 'price'
  return { price: 100 };
}
module.exports = { getPrice };
