// dependencies
const asyncHandler = require('express-async-handler');

// models
const {Product} = require('../models/ProductModel');


// ADD A NEW PRODUCT'S variant 
const addProductVariant = asyncHandler(async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        const newVariant = req.body.variants;
        newVariant.forEach(variant => {
          product.variants.push(variant);
        });
        await product.save();
    
        res.json(newVariant);
    } 
    catch (error) {
        res.status(500).json({ message: 'Internal server error' , error:error});
    }    
});

// GET ALL PRODUCT'S variants
const getProductVariants = asyncHandler(async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        const variants = product.variants;
        res.json(variants);
    } 
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }    
});

// DELETE A PRODUCT'S variant 
const deleteProductVariant = asyncHandler(async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        const variantId = req.params.variantId;
        const variantIndex = product.variants.findIndex((variant) => variant._id.toString() === variantId);
        if (variantIndex === -1) {
          return res.status(404).json({ message: 'Variant not found' });
        }
    
        product.variants.splice(variantIndex, 1);
        await product.save();
    
        res.json({ message: 'Variant deleted successfully' });
    }   
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// UPDATE A PRODUCT'S variant 
const updateProductVariant = asyncHandler(async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        const variantId = req.params.variantId;
        const variantToUpdate = product.variants.find((variant) => variant._id.toString() === variantId);
        if (!variantToUpdate) {
          return res.status(404).json({ message: 'Variant not found' });
        }
    
        const updatedVariant = req.body.variants;
        Object.assign(variantToUpdate, updatedVariant);
        await product.save();
    
        res.json(updatedVariant);
    } 
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }   
});

module.exports = {addProductVariant, getProductVariants, deleteProductVariant, updateProductVariant}