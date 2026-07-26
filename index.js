// Pricing service. CONTRACT: getPrice() returns { price: <number>, unit: <string> } — the orders
// service reads response.price and response.unit. (Do not rename these fields without updating consumers.)
function getPrice() {
  // Fixed (incident abc123): Restored contract field name from 'amount' to 'price'
  // and added explicit unit declaration. Pricing remains in cents.
  return { price: 100, unit: "cents" };
}
module.exports = { getPrice };
