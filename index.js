// Pricing service. CONTRACT: getPrice() returns { price: <number> } — the orders
// service reads response.price. (Do not rename this field without updating consumers.)
const http = require('http');

function getPrice() {
  return { price: 100 };
}
module.exports = { getPrice };

// Service entrypoint — only when executed directly (`node index.js`), so the unit
// test can require() this module without binding a port.
if (require.main === module) {
  const port = Number(process.env.PORT || 3001);
  http
    .createServer((req, res) => {
      const path = (req.url || '').split('?')[0];
      if (path === '/health') {
        res.writeHead(200, { 'content-type': 'text/plain' });
        return res.end('ok');
      }
      if (path === '/price') {
        res.writeHead(200, { 'content-type': 'application/json' });
        return res.end(JSON.stringify(getPrice()));
      }
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('not found');
    })
    .listen(port, '0.0.0.0', () => console.log(`[pricing] listening on ${port}`));
}
