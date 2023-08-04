// import controllers
const {
    addReview,
    adminGetReviews,
    getReviews, 
    updateReview, 
    deleteReview,
} = require('../controllers/ReviewCtrl');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

// ADD A PRODUCT REVIEW -ROUTE 
router.post('/:productId/add', authMiddleware , addReview)

// GET REVIEWS -ROUTE 
router.get('/all', getReviews)

// GET ALL REVIEWS FOR ADMIN -ROUTE 
router.get('/admin-all', authMiddleware, isAdmin, adminGetReviews)

// DELETE A PRODUCT REVIEW -ROUTE 
router.delete('/delete/:reviewId', authMiddleware, deleteReview)

// UPDATE A PRODUCT REVIEW -ROUTE 
router.put('/update/:reviewId', authMiddleware, updateReview)

module.exports = router;