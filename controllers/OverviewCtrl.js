const asyncHandler = require('express-async-handler');
const calculateWeekDates = require('../services/calculateWeekDates');
const User = require('../models/UserModel');
const Order = require('../models/OrderModel');

const getOverview = asyncHandler(async (req,  res)=>{
    try{
      const daysOfWeek = [1, 2, 3, 4, 5, 6, 7]
      const thisWeek = [{}, {}, {}, {}, {}, {}, {}]
      const previousWeek = [{}, {}, {}, {}, {}, {}, {}]
      let thisWeekOrders = 0
      let prevWeekOrders = 0
      let thisWeekAmount = 0
      let prevWeekAmount = 0 
      let thisWeekCustomers= 0
      let prevWeekCustomers= 0

      const currentDate = new Date();
      const { currentWeekStart, currentWeekEnd, previousWeekStart, previousWeekEnd } = calculateWeekDates(currentDate);
      const currentWeekData = await Order.aggregate([
        {
          $match:{
            createdAt: {
              $gte: currentWeekStart,
              $lte: currentWeekEnd,
            },
          },
        },
        {
          $group: {
            _id: { $dayOfWeek: '$createdAt' }, // Group by day of the week (Sunday=1, Monday=2, ...)
            orderCount: { $sum: 1 }, // Calculate the count of orders for each day
            totalAmmount: {$sum : '$total'}
          },
        },
        
      ])
      const previousWeekData = await Order.aggregate([
        {
          $match:{
            createdAt: {
              $gte: previousWeekStart,
              $lte: previousWeekEnd,
            },
          },
        },
        {
          $group: {
            _id: { $dayOfWeek: '$createdAt' }, // Group by day of the week (Sunday=1, Monday=2, ...)
            orderCount: { $sum: 1 }, // Calculate the count of orders for each day
            totalAmmount: {$sum : '$total'}
          },
        },
        
      ])

      
    const currentWeekCustomers = await User.find({
        createdAt: { $gte: currentWeekStart, $lte: currentWeekEnd },
        role: 'customer'
    });

    const previousWeekCustomers = await User.find({
        createdAt:{$gte: previousWeekStart, $lte: previousWeekEnd}, 
        role:'customer'
    });
        
  
      daysOfWeek.map((day, i)=>{
        const thisFromData = currentWeekData.filter(el=> el._id == day)
        const PrevFromData = previousWeekData.filter(el=> el._id == day)
        thisWeek[i] = {
          _id:day,
          orderCount:thisFromData[0]?.orderCount || 0,
          totalAmmount:thisFromData[0]?.totalAmmount || 0,
        }
        previousWeek[i] = {
          _id:day,
          orderCount:PrevFromData[0]?.orderCount || 0,
          totalAmmount:PrevFromData[0]?.totalAmmount || 0,
        }
  
        thisWeekOrders += thisWeek[i].orderCount;
        prevWeekOrders += previousWeek[i].orderCount;
        thisWeekAmount += thisWeek[i].totalAmmount;
        prevWeekAmount += previousWeek[i].totalAmmount;
      })
      thisWeekCustomers = currentWeekCustomers.length;
      prevWeekCustomers = previousWeekCustomers.length;
      console.log(thisWeekCustomers, prevWeekCustomers);
      res.json({thisWeekOrders, prevWeekOrders, thisWeekAmount, prevWeekAmount, thisWeek, previousWeek, thisWeekCustomers, prevWeekCustomers})
    }
    catch(error){ 
      return res.status(500).json({message:"Internal server error"})
    }
})

module.exports = {
    getOverview
};