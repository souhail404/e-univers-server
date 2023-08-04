// dependencies
const asyncHandler = require('express-async-handler');


// models
const Review = require('../models/ReviewModel');
const User = require('../models/UserModel');
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

        //check if user exist
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User doesn't exist"});
        }
        // check if already reviewed
        const AlreadyReviewed = await Review.find({itemId:productId, userId:userId})
        console.log(AlreadyReviewed);
        if(AlreadyReviewed.length > 0 && user.role !=='admin'){
            return res.status(400).json({ message: "you reviewd this product already"});
        }
        // body data
        const {author, rate, title, content, active } = req.body;

        // only admin can pass the author from body
        var validAuthor = req.user.firtName + ' ' + req.user.lastName;
        var validActive = true;
        if(req.user.role==='admin'){
            validAuthor = author;
            validActive = active;
        }

        const newReviewObj = {itemId:productId, userId, active:validActive, author:validAuthor, rate, title, content}
        const newReview = await Review.create(newReviewObj);
        if(newReview){
           product.reviews.push(newReview._id) 
           user.reviews.push(newReview._id) 
        }
        await user.save()
        await product.save()

        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error:err });
    }
});

const adminGetReviews = asyncHandler(async(req, res)=>{
    try {
        const reviews = await Review.find({});
        if (!reviews) {
          return res.status(404).json({ message: 'reviews not found' });
        }
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const getReviews = asyncHandler(async(req, res)=>{
    try {
        const reviews = await Review.find({active:true});
        if (!reviews) {
          return res.status(404).json({ message: 'reviews not found' });
        }
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const deleteReview = asyncHandler(async(req, res)=>{
    try {
        const { reviewId } = req.params;
        const userId = req.user._id;
        
        const review = await Review.findById(reviewId);

        if(!review){
            return res.status(404).json({ message: 'Review not found' });
        }
        const product = await Product.findById(review.itemId);
        const user = await User.findById(review.userId);

        //check ownership or admin
        if(review.userId.toString() !== userId.toString() && req.user.role !== "admin"){
            return res.status(500).json({ message: 'you are not authorized for this action' });
        }
        
        const reviewIndexProduct = product.reviews.findIndex((el) => el.toString() === reviewId);
        const reviewIndexUser = user.reviews.findIndex((el) => el.toString() === reviewId);

        
        product.reviews.splice(reviewIndexProduct, 1);
        user.reviews.splice(reviewIndexUser, 1);
        await product.save();
        await user.save();
        await Review.findByIdAndDelete(reviewId)
        
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' , error:err });
    }
});

const updateReview = asyncHandler(async(req, res)=>{
    try {
        const { reviewId } = req.params;
        const userId = req.user._id;
        
        const review = await Review.findById(reviewId)

        if(!review){
            return res.status(404).json({ message: 'review not found' });
        }
        if(review.userId.toString() !== userId.toString() && req.user.role !== "admin"){
            return res.status(500).json({ message: 'you are not authorized for this action' });
        }
        // body data
        const { author, rate, title, content, active } = req.body;

        // only admin can pass the author and validate from body
        var validAuthor = req.user.firtName + ' ' + req.user.lastName;
        var validActive = true;
        if(req.user.role==='admin'){
            validAuthor = author || review.author;
            validActive = active || review.active;
        }

        review.title = title,
        review.content= content,
        review.author= validAuthor,
        review.active= validActive,
        review.rate= rate,
        
        await review.save();

        res.json({ message: 'Review updated successfully', updatedReview:review });
    } catch (err) {
        res.status(500).json({ message: 'Server error' ,err:err });
    }
});

module.exports = {addReview, adminGetReviews, getReviews, deleteReview, updateReview}