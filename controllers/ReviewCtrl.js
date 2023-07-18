// dependencies
const asyncHandler = require('express-async-handler');


// models
const {Product} = require('../models/ProductModel');

const addReview = asyncHandler(async(req, res)=>{
    try {
        // ids from params
        const userId = req.user._id;
        const productId = req.params.productId;
        //check if product exist
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({ message: "the product doesnt exist"});
        }
        

        // body data
        const { author, rate, title, comment, active } = req.body;

        // only admin can pass the author from body
        var validAuthor = req.user.firt_name + ' ' + req.user.last_name;
        var validActive = true;
        if(req.user.role==='admin'){
            validAuthor = author;
            validActive = active;
        }
        
        // check if the user (not admin) already reviewed this product
        const existReview = product.reviews.filter((el) => {el.user_id===userId});
        if(req.user.role!=='admin' && existReview){
            return res.status(500).json({ message: "you already reviewed this product"});
        }
        const newReviewObj = { active:validActive, author:validAuthor, rate, title, comment}
        product.reviews.push(newReviewObj)
        await product.save()
        
        res.status(201).json(newReviewObj);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error:err });
    }
});

const getProductReviews = asyncHandler(async(req, res)=>{
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: 'product not found' });
        }
        const reviews = product.reviews;
        res.json(reviews);
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const deleteReview = asyncHandler(async(req, res)=>{
    try {
        const { reviewId, productId } = req.params;
        const userId = req.user._id;
        
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        //check ownership or admin
        const review = product.reviews.find((el) => el._id.toString() === reviewId);
        if(!review){
            return res.status(404).json({ message: 'review not found' });
        }
        if(review.user_id !== userId && req.user.role !== "admin"){
            return res.status(500).json({ message: 'you are not authorized for this action' });
        }
        const reviewIndex = product.reviews.findIndex((el) => el._id.toString() === reviewId);
        
        if (reviewIndex === -1) {
            return res.status(404).json({ message: 'Review not found' });
        }
        
        product.reviews.splice(reviewIndex, 1);
        await product.save();
        
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' ,error:err });
    }
});

const updateReview = asyncHandler(async(req, res)=>{
    try {
        const { reviewId, productId } = req.params;
        const userId = req.user._id;
        
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        //check ownership or admin
        const review = product.reviews.find((el) => el._id.toString() === reviewId);
        if(!review){
            return res.status(404).json({ message: 'review not found' });
        }
        if(review.user_id !== userId && req.user.role !== "admin"){
            return res.status(500).json({ message: 'you are not authorized for this action' });
        }
        // body data
        const { author, rate, title, comment, active } = req.body;

        // only admin can pass the author and validate from body
        var validAuthor = req.user.firt_name + ' ' + req.user.last_name;
        var validActive = true;
        if(req.user.role==='admin'){
            validAuthor = author || review.author;
            validActive = active || review.active;
        }
        const newReviewObj = { active:validActive, author:validAuthor, ...req.body}
        Object.assign(review, newReviewObj);
        await product.save();
        res.json({ message: 'Review updated successfully', updatedReview:newReviewObj });
    } catch (err) {
        res.status(500).json({ message: 'Server error' ,err:err });
    }
});





module.exports = {addReview, getProductReviews, deleteReview, updateReview}