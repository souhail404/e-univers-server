// import controllers
const {
    createUser,
    getUsers,
    getCustomers,
    getAdmins,
    loginUser, 
    updateUser, 
    deleteUser,
    loginAdmin,
    getUserById,
    resetPassword
} = require('../controllers/UserCtrl');

const {
    addToCart,
    removeFromCart,
    reduceCartItemQuantity,
    clearCart
} = require('../controllers/CartCtrl');

const {
    addToWishlist,
    removeFromWishlist
} = require('../controllers/WishlistCtrl');

const {
    createOrder,
    changeOrderState
} = require('../controllers/OrderCtrl');
 
const {
    addUserAddress,
    getUserAddress,
    getUserAddresses,
    deleteUserAddress,
    updateUserAddress
} = require('../controllers/AddressCtrl');

const express = require('express');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();

// CRAETE USER -ROUTE 
router.post('/register', createUser)

// LOGIN ADMIN -ROUTE 
router.post('/admin-login', loginAdmin)

// LOGIN USER -ROUTE 
router.post('/login', loginUser)

// GET ALL USERS -ROUTE 
router.get('/', authMiddleware, isAdmin , getUsers)

// GET USER BY ID -ROUTE 
router.get('/id/:userId', authMiddleware, isAdmin , getUserById)

// GET ALL USERS -ROUTE 
router.get('/customers', authMiddleware, isAdmin , getCustomers)

// GET ALL USERS -ROUTE 
router.get('/admins', authMiddleware, isAdmin , getAdmins)

// UPDATE USER -ROUTE 
router.put('/update/:id',authMiddleware, updateUser) 

// RESET PASSWORD -ROUTE 
router.put('/reset-password/:userId',authMiddleware, resetPassword) 

// DELETE USER -ROUTE 
router.delete('/:id', authMiddleware , deleteUser)

// ADD A USER ADDRESS -ROUTE 
router.post('/:id/addresses/add', authMiddleware , addUserAddress)

// GET ALL USER ADDRESSES -ROUTE 
router.get('/:id/addresses/', authMiddleware , getUserAddresses)

// GET A USER ADDRESS -ROUTE 
router.get('/:id/addresses/:addressId', authMiddleware , getUserAddress)

// DELETE A USER ADDRESS -ROUTE 
router.delete('/:id/addresses/:addressId', authMiddleware , deleteUserAddress)

// UPDATE A USER ADDRESS -ROUTE 
router.put('/:id/addresses/:addressId', authMiddleware , updateUserAddress)

// Add an item to the user's cart
router.post('/cart/add-to-cart/:productId',authMiddleware, addToCart);

// Remove an item from the user's cart
router.delete('/cart/remove-from-cart/:productId',authMiddleware, removeFromCart);

// Reduce quantity of an item in the cart
router.patch('/cart/reduce-cart-item/:productId',authMiddleware, reduceCartItemQuantity);

// Clear the cart
router.delete('/cart/clear-cart',authMiddleware, clearCart);

// Add an item to the user's wishlist
router.post('/wishlist/add/:productId', authMiddleware, addToWishlist);

// Remove an item from the user's wishlist
router.delete('/wishlist/remove/:productId', authMiddleware, removeFromWishlist);

// Add an item to the user's orders
router.post('/order/create-order', authMiddleware, createOrder);

// update order's state
router.put('/order/change-order-state/:orderId', authMiddleware, isAdmin, changeOrderState);

module.exports = router;