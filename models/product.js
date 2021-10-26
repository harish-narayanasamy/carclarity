const Joi = require('joi');
const mongoose = require('mongoose');

const Product = mongoose.model('Products', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  productId: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },

  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  rate: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
}));

function validateProduct(product) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    productId: Joi.string().min(5).max(50).required(),
    numberInStock: Joi.number().min(0).required(),
    rate: Joi.number().min(0).required()
  };

  return Joi.validate(product, schema);
}

exports.Product = Product; 
exports.productValidate = validateProduct;