const { Product, productValidate } = require("../models/product");
const express = require("express");
const router = express.Router();
const { saveRecord, updateRecord } = require("../controller/datastoreA");
const { uuid } = require('uuidv4');
const emitter = require("../controller/emitter");

router.get("/", async (req, res) => {
    const products = await Product.find()
        .sort("title");
    res.send(products);
});

router.post("/", async (req, res) => {
    req.body.productId = uuid();
    const { error } = productValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let output = await saveRecord(req.body);
    emitter.emitter.emit("fromStoreA", { type: "save", data: output })

    res.send(output);
});

router.put("/:id", async (req, res) => {
    const { error } = productValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let output = await updateRecord(req.body, req.params.id);
    if (!output) {
        return res.status(404).send("The product with the given ID was not found.");

    }
    emitter.emitter.emit("fromStoreA", { type: "update", data: output, id: req.params.id })

    res.send(output);
});

router.get("/:id", async (req, res) => {
    let query = { "productId": req.params.id };
    const product = await Product.find(query);
    if (!product)
        return res.status(404).send("The product with the given ID was not found.");
    res.send(product);
});

module.exports = router;
