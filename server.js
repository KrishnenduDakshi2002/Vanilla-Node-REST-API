const { createServer } = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("./controller/porducts.controller");
const server = createServer();

server.on("request", (req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/product\/([a-zA-Z0-9]+)/) &&
    req.method === "GET"
  ) {
    // will return all params from request url
    // const PARAMS = params(req.url) // Array of params
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  } else if (
    req.url.match(/\/api\/product\/update\/([0-9]+)/) &&
    req.method === "PATCH"
  ) {
    const id = req.url.split("/")[4];
    updateProduct(req, res, id);
  } 
  else if(req.url.match(/\/api\/product\/delete\/([a-zA-Z0-9]+)/) && req.method=== 'DELETE'){
    const id = req.url.split("/")[4];
    deleteProduct(req, res, id);
  }
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});
const PORT = process.env.PORT || 4000;
const HOST = "127.0.0.1";

server.listen(PORT, HOST, () =>
  console.log(`Server running on http://${HOST}:${PORT}`)
);
