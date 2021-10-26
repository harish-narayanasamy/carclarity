const { Product } = require("../models/product");
const emitter = require("./emitter");
const fs = require('fs').promises;

emitter.emitter.on("fromStoreA", function (message) {

    if (message.type == "save") {
        saveRecord(message.data)
    }
    if (message.type == "update") {
        updateRecord(message.data,message.id)
    }
})
async function saveRecord(body) {

    let data = await fs.readFile("./datastoreB.json");
    let json = JSON.parse(data);
    let newData = {
        "title": body.title,
        "numberInStock": body.numberInStock,
        "rate": body.rate,
        "productId": body.productId
    };
    json.push(newData)
    await fs.writeFile("./datastoreB.json", JSON.stringify(json));
    return newData;

};

async function updateRecord(body, id) {

    let data = await fs.readFile("./datastoreB.json");
    let json = JSON.parse(data);
    let filteredData = await Promise.all(json.map((item) => {
        if (item.productId === id) {
            item.title = body.title;
            item.productId = id;
            item.numberInStock = body.numberInStock;
            item.rate = body.rate;
        }
        return item;
    }));
    await fs.writeFile("./datastoreB.json", JSON.stringify(filteredData));

    return {
        title: body.title,
        productId: id,
        numberInStock: body.numberInStock,
        rate: body.rate
    };
}



module.exports = {
    saveRecord,
    updateRecord
}