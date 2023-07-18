// dependencies
const asyncHandler = require('express-async-handler');

const User = require('../models/UserModel');
const {Product} = require('../models/ProductModel');

// Create an order for a user
const createOrder = asyncHandler(async (req, res) => {
  try {
    
    const userId = req.user._id;
    const { items, shipping_address } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Check if the items in the order are valid and available
    const validatedItems = [];
    for (const item of items) {
        const product = await Product.findById(item.item_id);
        if (!product || product.stock <= 0) {
            return res.status(400).json({ message: 'Invalid product or out of stock' });
        }

        if (item.quantity > product.stock) {
            return res.status(400).json({ message: 'Insufficient stock for one or more items in the order' });
        }
        
        validatedItems.push({
            quantity: item.quantity,
            item_id: item.item_id,
        });
        const ordered = product.ordered + 1; 
        product.ordered = ordered;
        await product.save();
    }

    // Create the order
    const order = {
      items: validatedItems,
      shipping_address,
      order_state: 'pending',
    };

    user.orders.push(order);
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error:error});
  }
});

// Change order state (Admin only)
const changeOrderState = asyncHandler(async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const newOrderState = req.body.order_state;

    if (!orderId || !newOrderState) {
      return res.status(400).json({ message: 'Invalid order ID or order state' });
    }

    const user = await User.findOneAndUpdate(
      { 'orders._id': orderId },
      { $set: { 'orders.$.order_state': newOrderState } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {
  createOrder,
  changeOrderState,
};
