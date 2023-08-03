// dependencies
const asyncHandler = require('express-async-handler');

// controllers/wishlistController.js
const User = require('../models/UserModel');
const {Product} = require('../models/ProductModel');

// Add an item to the user's wishlist
const addToWishlist = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        const user = await User.findById(userId);
        const product = await Product.findById(productId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Add the item to the wishlist if it doesn't already exist
        if (!user.wishlist.some((item) => item.item.toString() === productId.toString())) {
            user.wishlist.push({ item: productId });
            await user.save();
            const liked = product.liked + 1;
            product.liked = liked;
            await product.save();
        }

        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Remove an item from the user's wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        const user = await User.findById(userId);

        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        // Remove the item from the wishlist
        user.wishlist = user.wishlist.filter((item) => item.item.toString() !== productId);
        await user.save();

        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
  addToWishlist,
  removeFromWishlist,
};
