// import controllers
const {
    createProduct,
    getProducts,
    getProduct, 
    updateProduct, 
    deleteProduct,
    generate,
} = require('../controllers/ProductCtrl');

const { uploadImage } = require('../controllers/imageCtrl');

const {
    addProductVariant,
    getProductVariants,
    deleteProductVariant,
    updateProductVariant
} = require('../controllers/VariantCtrl');


const express = require('express');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');
const router = express.Router();

// CRAETE PRODUCT -ROUTE 
router.post('/add', authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImgResize, createProduct);

// generate -ROUTE 
router.post('/generate',authMiddleware, isAdmin, generate)

// GET ALL PRODUCTS -ROUTE 
router.get('/' , getProducts)

// GET ONE PRODUCT -ROUTE 
router.get('/:productId' , getProduct)

// UPDATE PRODUCT -ROUTE 
router.put('/:productId',authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImgResize, updateProduct);

// DELETE PRODUCT -ROUTE 
router.delete('/:productId',authMiddleware, isAdmin, deleteProduct);

// UPLOAD IMAGES -ROUTE 
router.post('/images/upload', authMiddleware, isAdmin, uploadPhoto.array('images', 10) , productImgResize, uploadImage)

// VARIANT ----------------------------------------------------

// ADD A PRODUCT VARIANT -ROUTE 
router.post('/:id/variants/add', authMiddleware, isAdmin , addProductVariant)

// GET ALL PRODUCT VARIANTS -ROUTE 
router.get('/:id/variants/', getProductVariants)

// DELETE A PRODUCT VARIANT -ROUTE 
router.delete('/:id/variants/:variantId', authMiddleware, isAdmin , deleteProductVariant)

// UPDATE A PRODUCT VARIANT -ROUTE 
router.put('/:id/variants/:variantId', authMiddleware, isAdmin , updateProductVariant)



module.exports = router;