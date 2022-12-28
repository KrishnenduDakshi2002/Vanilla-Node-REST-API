const products = require("../Data/data.json");
const { writeDataToFile } = require("../utils/file");
const path = require("path");
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}
function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: product.length + 1, ...product };
    products.push(newProduct);
    //  getting current working directory using process.cwd()
    const fname = path.join(process.cwd(), "/Data/data.json");
    writeDataToFile(fname, products);
    resolve(newProduct);
  });
}
function update(id, product) {
  return new Promise((resolve, reject) => {
    const idx = products.findIndex((product) => product.id === id);
    products[idx] = { id, ...product };
    const fname = path.join(process.cwd(), "/Data/data.json");
    writeDataToFile(fname, products);
    resolve(products[idx]);
  });
}

function findByIdAndUpdate(id, data) {
  return new Promise((resolve, reject) => {
    const product_idx = products.findIndex((p) => p.id === id);
    const product = products[product_idx];
    const ParsedData = JSON.parse(data);
    for (const [key, value] of Object.entries(product)) {
        if(Object.hasOwn(ParsedData,key)){
            if(typeof product[key] === 'number') {product[key]  = +ParsedData[key]}
            else product[key] = ParsedData[key];
        };
    }
    products[product_idx] = product;
    const fname = path.join(process.cwd(), "/Data/data.json");
    writeDataToFile(fname, products);
    resolve(products[product_idx]);
  });
}

function findByIdAndDelete(id) {
  return new Promise((resolve, reject) => {
    const product_idx = products.findIndex((p) => p.id === id);
    if(product_idx === -1) resolve ({ deleteCount : 0, message : 'id not found', deletedId : null})
    else{
        // start index and delete_count
        products.splice(product_idx,1); 
        const fname = path.join(process.cwd(), "/Data/data.json");
        writeDataToFile(fname, products);
        resolve({ deleteCount: 1,message:"deleted succusfully", deletedId: id});
    }
  });
}
module.exports = {
  findAll,
  findById,
  create,
  update,
  findByIdAndUpdate,
  findByIdAndDelete
};
