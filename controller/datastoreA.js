const { Product } = require("../models/product");
const emitter = require("./emitter");

emitter.emitter.on("fromStoreB", function (message) {

    if (message.type == "save") {
        saveRecord(message.data)
    }
    if (message.type == "update") {
        updateRecord(message.data,message.id)

    }
})
async function saveRecord(body) {
    let product = new Product({ title: body.title, productId: body.productId, numberInStock: body.numberInStock, rate: body.rate });
    product = await product.save();
    return product;

};

async function updateRecord(body, id) {
    let query = { "productId": id };
    let newData = { title: body.title, productId: id, numberInStock: body.numberInStock, rate: body.rate };
    let newvalues = { $set: newData };
    await Product.updateOne(query, newvalues);
    return newData;
}



module.exports = {
    saveRecord,
    updateRecord
}