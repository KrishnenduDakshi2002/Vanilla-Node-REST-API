const ProductModel = require("../model/product.model");
const { v4: uuidv4 } = require("uuid");
const { BodyParser } = require("../utils/RequestData");

async function getProducts(req, res) {
  try {
    const products = await ProductModel.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
}

async function getProduct(req, res, id) {
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
}

async function createProduct(req, res) {
  try {
    const body = await BodyParser(req);
    const { product, description, price } = JSON.parse(body);
    const productData = {
      id: uuidv4(),
      product,
      description,
      price: +price,
    };
    const newProduct = await ProductModel.create(productData);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
}
async function updateProduct(req, res,id) {
  try {
      const body = await BodyParser(req);
    const updatedProduct = await ProductModel.findByIdAndUpdate(id,body);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedProduct)); 

  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
}
async function deleteProduct(req, res,id) {
  try {
    const deleteResponse = await ProductModel.findByIdAndDelete(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(deleteResponse)); 

  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
