const { productValidate } = require("../models/product");
const express = require("express");
const router = express.Router();
const { saveRecord, updateRecord } = require("../controller/datastoreB");
const { uuid } = require('uuidv4');
const emitter = require("../controller/emitter");
const fs = require('fs').promises;


router.get("/", async (req, res) => {
    let data = await fs.readFile("./datastoreB.json");
    let json = JSON.parse(data);
    let filteredData = await Promise.all(json.filter((item) => {
        return item;
    }));
    res.send(filteredData);
});

router.post("/", async (req, res) => {
    req.body.productId = uuid();
    const { error } = productValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let output = await saveRecord(req.body);
    emitter.emitter.emit("fromStoreB", { type: "save", data: output })

    res.send(output);
});

router.put("/:id", async (req, res) => {
    const { error } = productValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let output = await updateRecord(req.body, req.params.id);
    if (!output) {
        return res.status(404).send("The product with the given ID was not found.");
    };
    emitter.emitter.emit("fromStoreB", { type: "update", data: output,id:req.params.id })

    res.send(output);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id ;
    let data = await fs.readFile("./datastoreB.json");
    let json = JSON.parse(data);
    let filteredData = await Promise.all(json.filter((item) => {
        if (item.productId === id) {
            return item;
        }
    }));
    res.send(filteredData);
});

module.exports = router;
