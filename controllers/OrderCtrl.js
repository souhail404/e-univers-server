// dependencies
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose')
const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
const {Product} = require('../models/ProductModel');


// Create an order for a user
const createOrder = asyncHandler(async (req, res) => {
  try {  
    const userId = req.user._id;
    const { items, shippingAddress } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Check if the items in the order are valid and available
    const validatedItems = [];
    let totalPrice= 0;
    for (const item of items) {
        const product = await Product.findById(item.itemId);
        // check if available in stock
        if (!product || product.stock <= 0) {
            return res.status(400).json({ message: 'Invalid product or out of stock' });
        }
        // check if quantity is not over stock
        if (item.quantity > product.stock) {
            return res.status(400).json({ message: 'Insufficient stock for one or more items in the order' });
        }
        // set item name 
        item.itemName = product.title;
        //set item price
        item.itemPrice= product.sellPrice;
        // add price difference for every option selected
        item.itemOptions.forEach((option) => {
          const variant = product.variants.find((v) => v._id.toString() === option.variantId.toString());
          if (variant) {
            const selectedOption = variant.options.find((opt) => opt._id.toString() === option.optionId.toString());
            if (selectedOption) {
              item.itemPrice += selectedOption.priceDef; // Add the priceDef to the totalPrice
            }
          }
        });
        // set item total price based on item price and quantity
        item.itemTotalPrice= item.itemPrice * item.quantity; 
        // set total order price
        totalPrice = totalPrice + item.itemTotalPrice;
        // set the valid items info
        validatedItems.push({
            quantity: item.quantity,
            itemId: item.itemId,
            itemName: item.itemName,
            itemOptions:item.itemOptions,
            itemPrice:item.itemPrice,
            itemTotalPrice:item.itemTotalPrice
        });
        // increment the ordred counter and save it
        const ordered = product.ordered + 1; 
        product.ordered = ordered;
        await product.save();
    }

    // Create the order
    const newOrder = await Order.create({items:validatedItems, shippingAddress, orderState: 'pending', total:totalPrice, userId})
    // add order to user
    user.orders.push(newOrder._id);
    await user.save()
    
    res.status(200).json({message:'order created successfully', newOrder});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error:error});
  }
}); 

// get all orders (admin)
const getAllOrders = asyncHandler(async (req, res) => {
  try {  
    const {
      recentlyAdded,
      orderState,
      product,
      user,
      page,    
      pageSize,
    } = req.query;  
    // build the query
    const query = {};
    // if user note admin return only user orders not all
    if(req.user.role!=="admin"){
      query.userId = req.user._id;
    }
    // if user note admin return only user orders not all
    if(req.user.role==="admin" && user){
      query.userId =  user;
    }
    // state filter
    if (orderState) {
      query.orderState = orderState;
    }
    // product filter    
    if (product) {
      query['items.itemId'] = product;
    }
    // Recently Added filter
    if (recentlyAdded === 'true') {
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      query.createdAt = { $gte: lastWeek };
    }

    // Execute the query to find products
    let ordersQuery = Order.find(query)
                      .populate({path:'items.itemId', select:'title'})
                      .populate({path:'userId'})
    
    // Sorting
    const sort = req.query.sort || 'createdAt:desc'  
    if (sort) {
        const [sortField, sortOrder] = sort.split(':');
        const sortOptions = {};
        sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1;
        ordersQuery = ordersQuery.sort(sortOptions);
    }
    // Pagination
    const DEFAULT_PAGE_SIZE = 10; 
    const currentPage = parseInt(page) || 1;
    const pageSizeValue = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
    const skipItems = (currentPage - 1) * pageSizeValue;
    ordersQuery = ordersQuery.skip(skipItems).limit(pageSizeValue);


    const orders = await ordersQuery.exec();
    
    const totalOrdersCount = await Order.countDocuments(query).exec();

    const totalPages = Math.ceil(totalOrdersCount / pageSizeValue);

    if(!orders){
      return res.status(404).json({ message: 'Orders not found'});
    }
    return res.status(200).json({
        totalOrders: totalOrdersCount,
        totalPages: totalPages,
        currentPage: currentPage, 
        pageSize: pageSizeValue,
        orders
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error:error});
  }
});

// get User orders
const getUserOrders = asyncHandler(async (req, res) => {
  try {  
    const userId = req.user._id;
    const orders = await Order.find({userId});
    res.status(200).json({message:'orders fetched sucessfully', orders});
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
  getAllOrders,
  getUserOrders,
};
