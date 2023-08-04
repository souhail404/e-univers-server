// import controllers
const {
    createOrder,
    changeOrderState,
    getAllOrders,
    getUserOrders
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

// GET USER ORDERS STATE
router.get('/user', authMiddleware, getUserOrders);

module.exports = router;