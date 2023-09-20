// import controllers
const {
    createOrder,
    changeOrderState,
    getAllOrders,
    getUserOrders,
    getOneOrder,
} = require('../controllers/OrderCtrl');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

// CREATE ORDER
router.post('/create', authMiddleware, createOrder);
 
// CHANGE ORDER STATE
router.put('/update/:orderId', authMiddleware, isAdmin, changeOrderState);

// GET ALL ORDERS STATE
router.get('/all', authMiddleware, isAdmin, getAllOrders);

// GET ALL ORDERS STATE
router.get('/one/:orderId', authMiddleware, isAdmin, getOneOrder);

// GET USER ORDERS STATE 
router.get('/user/:userId', authMiddleware, getUserOrders); 



module.exports = router;