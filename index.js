// Pricing service. CONTRACT: getPrice() returns { price: <number> } — the orders
// service reads response.price. (Do not rename this field without updating consumers.)
function getPrice() {
  // FIXED (work-260821133013-koala-bug-check): restored contract field name from amount -> price
  return { price: 100 };
}
module.exports = { getPrice };
