// dependencies
const asyncHandler = require('express-async-handler');


// models
const User = require('../models/UserModel');
const {Product} = require('../models/ProductModel');

const addToCart = asyncHandler(async(req, res)=>{
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        const quantity = req.body.quantity || 1;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const product = await Product.findById(productId);
        // Check if the product exists and is available
        if (!product || product.stock <= 0) {
            return res.status(404).json({ message: 'Product not found or out of stock' });
        }
        
        // Check if the product already exists in the cart
        const existingCartItem = user.cart.find((item) => item.item.toString() === productId.toString());
        if (existingCartItem) {
            // Update the quantity of the existing item
            existingCartItem.quantity += quantity;
        } else {
            // Add the new item to the cart
            user.cart.push({ item: productId, quantity });
        }

        await user.save();
        const added_to_cart = product.added_to_cart + 1;
        product.added_to_cart = added_to_cart;
        await product.save();

        res.json(user.cart);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error});
    }
});

const reduceCartItemQuantity  = asyncHandler(async(req, res)=>{
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        const quantityToReduce = 1;
    
        const user = await User.findById(userId);
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        // Find the cart item to reduce quantity
        const cartItemToReduce = user.cart.find((item) => item.item.toString() === productId.toString());
        if (!cartItemToReduce) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        else{
            
        }
    
        // Reduce the quantity, making sure it doesn't go below 0
        cartItemToReduce.quantity = Math.max(cartItemToReduce.quantity - quantityToReduce, 1);
    
        await user.save();

        return res.status(200).json({cart:user.cart});
    } catch (error) {
        return res.status(500).json({ message: 'Intrenal server error', error });
    }
});

const removeFromCart = asyncHandler(async(req, res)=>{
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the item from the cart
        user.cart = user.cart.filter((el) => el.item.toString() !== productId);
        await user.save();

        return res.status(200).json({cart:user.cart});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
});

const clearCart = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
    
        const user = await User.findById(userId);
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        // Clear the cart by setting it to an empty array
        user.cart = [];
        await user.save();
    
        return res.status(200).json({cart:user.cart});
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = {addToCart, removeFromCart, reduceCartItemQuantity, clearCart}