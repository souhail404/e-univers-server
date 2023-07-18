// dependencies
const asyncHandler = require('express-async-handler');
// models
const User = require('../models/UserModel');

// ADD A NEW USER'S ADDRESS 
const addUserAddress = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    // check the ownership or admin
    if(String(req.user._id) !== String(id) && req.user.role !== 'admin'){
        throw Error('you are not authorized to add address to this user')
    }

    const updatedUser = await User.findOneAndUpdate({_id:id}, {$push:{addresses:req.body.addresses}}, {new:true});
    if(!updatedUser){
        throw Error('error while adding user address')
    }
    res.json(updatedUser);    
});

// GET ALL USER'S ADDRESSES 
const getUserAddresses = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    // check the ownership or admin
    if(String(req.user._id) !== String(id) && req.user.role !== 'admin'){
        throw Error('you are not authorized to fetch this user addresses')
    }

    const addresses = await User.findOne({_id:id}).select('addresses -_id');
    if(!addresses){
        throw Error('error while fetching addresses')
    }
    res.json(addresses);    
});

// GET ONE USER'S ADDRESS
const getUserAddress = asyncHandler(async(req, res)=>{
    const {id, addressId} = req.params; 
    // check the ownership or admin
    if(String(req.user._id) !== String(id) && req.user.role !== 'admin'){
        throw Error('you are not authorized to fetch this address')
    }
    const user = await User.findById(id);
    if(!user){
        throw Error('User not found')
    }
    const address =  user.addresses.find((addr) => addr._id.toString() === addressId);
    if(!address){
        throw Error('Address not found')
    }
    res.json(address);    
});

// DELETE A USER'S ADDRESS 
const deleteUserAddress = asyncHandler(async(req, res)=>{
    const {id, addressId} = req.params; 
    // check the ownership or admin
    if(String(req.user._id) !== String(id) && req.user.role !== 'admin'){
        throw Error('you are not authorized to fetch this address')
    }
    const user = await User.findById(id);
    if(!user){
        throw Error('User not found')
    }
    const addressIndex =  user.addresses.findIndex((addr) => addr._id.toString() === addressId);
    if(addressIndex === -1){
        throw Error('Address not found')
    }
    user.addresses.splice(addressIndex, 1);
    await user.save();
    
    res.json({ message: 'Address deleted successfully'});
});

// UPDATE A USER'S ADDRESS 
const updateUserAddress = asyncHandler(async(req, res)=>{
    const {id, addressId} = req.params; 
    const { country, city, zip, street, house_number } = req.body;
    // check the ownership or admin
    if(String(req.user._id) !== String(id) && req.user.role !== 'admin'){
        throw Error('you are not authorized to fetch this address')
    }
    const user = await User.findById(id);
    if(!user){
        throw Error('User not found')
    }
    const addressIndex =  user.addresses.findIndex((addr) => addr._id.toString() === addressId);
    if(addressIndex === -1){
        throw Error('Address not found')
    }
    country ? user.addresses[addressIndex].country = country :null;
    city ? user.addresses[addressIndex].city = city : null;
    zip ? user.addresses[addressIndex].zip = zip : null;
    street ? user.addresses[addressIndex].street = street : null;
    house_number ? user.addresses[addressIndex].house_number = house_number : null;

    await user.save();

    const updatedAddress = user.addresses[addressIndex];
    res.json({ message: 'Address updated successfully' , updatedAddress});   
});


module.exports = {
    addUserAddress,
    getUserAddress,
    getUserAddresses,
    deleteUserAddress,
    updateUserAddress
}