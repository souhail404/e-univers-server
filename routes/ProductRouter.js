// import controllers
const {
    createProduct,
    getProducts,
    getProduct, 
    updateProduct, 
    deleteProduct,
    generate
} = require('../controllers/ProductCtrl');

const {
    addProductVariant,
    getProductVariants,
    deleteProductVariant,
    updateProductVariant
} = require('../controllers/VariantCtrl');

const {
    addReview,
    getProductReviews,
    deleteReview,
    updateReview
} = require('../controllers/ReviewCtrl');

const express = require('express');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();

// CRAETE PRODUCT -ROUTE 
router.post('/add',authMiddleware, isAdmin, createProduct)

// generate -ROUTE 
router.post('/generate',authMiddleware, isAdmin, generate)

// GET ALL PRODUCTS -ROUTE 
router.get('/' , getProducts)

// GET ONE PRODUCT -ROUTE 
router.get('/:productId' , getProduct)

// UPDATE PRODUCT -ROUTE 
router.put('/:productId',authMiddleware, isAdmin, updateProduct);

// DELETE PRODUCT -ROUTE 
router.delete('/:productId',authMiddleware, isAdmin, deleteProduct);

// VARIANT ----------------------------------------------------

// ADD A PRODUCT VARIANT -ROUTE 
router.post('/:id/variants/add', authMiddleware, isAdmin , addProductVariant)

// GET ALL PRODUCT VARIANTS -ROUTE 
router.get('/:id/variants/', getProductVariants)

// DELETE A PRODUCT VARIANT -ROUTE 
router.delete('/:id/variants/:variantId', authMiddleware, isAdmin , deleteProductVariant)

// UPDATE A PRODUCT VARIANT -ROUTE 
router.put('/:id/variants/:variantId', authMiddleware, isAdmin , updateProductVariant)


// REVIEW ----------------------------------------------------

// ADD A PRODUCT REVIEW -ROUTE 
router.post('/:productId/reviews/add', authMiddleware , addReview)

// GET ALL PRODUCT REVIEW -ROUTE 
router.get('/:productId/reviews/', getProductReviews)

// DELETE A PRODUCT REVIEW -ROUTE 
router.delete('/:productId/reviews/:reviewId', authMiddleware, deleteReview)

// UPDATE A PRODUCT REVIEW -ROUTE 
router.put('/:productId/reviews/:reviewId', authMiddleware, updateReview)

module.exports = router;