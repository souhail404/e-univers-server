// dependencies
const asyncHandler = require('express-async-handler');
const {generateToken} = require('../config/jwtToken')
const bcrypt = require('bcrypt')
// models
const User = require('../models/UserModel');

// CREATE A USER
const createUser = asyncHandler(async(req, res)=>{
    // check if already connected
    if(req.headers.authorization){
        throw Error('you are already connected, please logout!');
    };

    // check if email, username or mobile already exists
    const email = req.body.email;
    const username = req.body.userName;
    const mobile = req.body.mobile;

    const existEmail = await User.findOne({email:email});
    const existUsername = await User.findOne({userName:username});
    const existMobile = await User.findOne({mobile:mobile});
    if(existEmail){
        throw Error('the email you entred already exist !');
    };
    if(existUsername){
        throw Error('the username you entred already exist !');
    };
    if(existMobile){
        throw Error('the mobile you entred already exist !');
    };

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // create the new user
    const newUser = await User.create({...req.body, password:hashedPassword , reviews:[]});

    res.json(newUser);
});

// Login USER
const loginUser = asyncHandler(async(req, res)=>{
    try{
        // check if already connected
        if(req.headers.authorization){
            return res.status(404).json({error:'you are already connected, please logout !'});
        };

        // find the user by email, username or mobile
        const userRef = req.body.userRef;

        const user = await User.findOne({mobile:userRef}) || 
                    await User.findOne({userName:userRef}) || 
                    await User.findOne({email:userRef});

        if(!user){
            return res.status(404).json({message:'user not found'});
        }    

        // check if the password match 
        const isPassworCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPassworCorrect){
            return res.status(400).json({message:'incorrect password'});
            
        }
        res.status(200).json({
            id:user._id,
            user:user.userName,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    catch(err){
        return res.status(500).json({message:'server error', error:err});
    }
})

// admin login
const loginAdmin = asyncHandler(async(req, res)=>{
    try{
        // check if already connected
        if(req.headers.authorization){
            return res.status(404).json({message:'you are already connected, please logout !'});
        };

        // find the user by email, username or mobile
        const userRef = req.body.userRef;

        const user = await User.findOne({mobile:userRef}) || 
                     await User.findOne({userName:userRef}) || 
                     await User.findOne({email:userRef});

        if(!user){
            return res.status(404).json({message:'user not found'});
        } 
        // check if admin   
        if (user.role !== 'admin') {
            return res.status(400).json({message:'you are not an admin'});
        }
        // check if the password match 
        const isPassworCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPassworCorrect){
            return res.status(400).json({message:'Password incorrect'});
        }
        res.status(200).json({
            id:user._id,
            user:user.userName,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    catch(err){
        return res.status(500).json({msg:'server error', error:err});
    }
})

// FIND ALL USERS
const getUsers = asyncHandler(async(req, res)=>{
    try {
        const users = await User.find({});
        if(!users){ 
            return res.status(404).json({message:'users not found'})
        } 
        return res.status(200).json({users})
    } catch (error) {
        return res.status(500).json({message:'intenal server error', error:error})
    }
})

const getUserById = asyncHandler(async(req, res)=>{
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);
        if(!user){ 
            return res.status(404).json({message:'users not found'})
        } 
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({message:'intenal server error', error:error})
    }
})

const getCustomers = asyncHandler(async(req, res)=>{
    try {
        const {
            recentlyAdded,
            search,   
            page,    
            pageSize,
        } = req.query;  
        // build the query
        const query = {};

        // Recently Added filter
        if (recentlyAdded === 'true') {
            const today = new Date();
            const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            query.createdAt = { $gte: lastWeek };
        }

        // Keywords/Search filter
        if (search) {
            query.$or = [
                { userName: { $regex: search, $options: 'i' } },
                { firtName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
            ];
        }

        // Execute the query to find products
        let customersQuery = User.find({...query, role:'customer'})

        // Sorting
        const sort = req.query.sort || 'createdAt:desc'  
        if (sort) {
            const [sortField, sortOrder] = sort.split(':');
            const sortOptions = {};
            sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1;
            customersQuery = customersQuery.sort(sortOptions);
        }

        // Pagination
        const DEFAULT_PAGE_SIZE = 10; 
        const currentPage = parseInt(page) || 1;
        const pageSizeValue = parseInt(pageSize) || DEFAULT_PAGE_SIZE;
        const skipItems = (currentPage - 1) * pageSizeValue;
        customersQuery = customersQuery.skip(skipItems).limit(pageSizeValue);

        const customers = await customersQuery.exec();
    
        const totalCustomersCount = await User.countDocuments(query).exec();

        const totalPages = Math.ceil(totalCustomersCount / pageSizeValue);
        
        if(!customers){ 
            return res.status(404).json({message:'customers not found'})
        } 
        return res.status(200).json({totalCustomers:totalCustomersCount, totalPages , currentPage, pageSize: pageSizeValue, customers})
    } catch (error) {
        return res.status(500).json({message:'intenal server error', error:error})
    }
})

const getAdmins = asyncHandler(async(req, res)=>{
    try {
        const admins = await User.find({role:'admin'});
        if(!admins){ 
            return res.status(404).json({message:'customers not found'})
        } 
        return res.status(200).json({admins})
    } catch (error) {
        return res.status(500).json({message:'intenal server error', error:error})
    }
})

// UPDATE USER 
const updateUser = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    // check the ownership or admin
    if(String(req.user._id) !== String(id) && req.user.role !== 'admin'){
        throw Error('you are not authorized to update this user')
    }
    // update the user
    const user = await User.findOneAndUpdate({_id:id} , {...req.body} , {new:true});
    
    if(!user){
        throw Error('error while Updating user')
    }
    res.json(user);   
});

// RESET USER PASSWORD
const resetPassword = asyncHandler(async(req, res)=>{
    try {
        const userId = req.params.userId;
        const {currentPassword, newPassword, newPasswordTwo} = req.body;
        // check the ownership or admin
        if(String(req.user._id) !== String(userId) && req.user.role !== 'admin'){
            return res.status(400).json({message:'you are not authorized to update this user'})
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message:'user not found'})
        }
        if (newPassword !== newPasswordTwo) {
            return res.status(400).json({message:"New Password doesn't match with confirmation"})
        }
        // check if password correct
        const isPassworCorrect = await bcrypt.compare(currentPassword, user.password)
        if (!isPassworCorrect) {
            return res.status(400).json({message:'password you entred is incorrect'})
        } 
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save(); 
        return res.status(200).json({message:"Password updated successfully"})
    } catch (error) {
        return res.status(500).json({message:"internal server error" , error})
    }
});

// DELETE USER 
const deleteUser = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    // check the ownership or admin
    if(String(req.user._id) !== String(id) && req.user.role !== 'admin'){
        throw Error('you are not authorized to delete this user')
    }
    // delete user
    const deletedUser = await User.findOneAndDelete({_id:id});
    if(!deletedUser){
        throw Error('error while Deleting user')
    }
    res.json({deletedUser});    
});

module.exports = {
    createUser,
    getUsers,
    loginUser, 
    updateUser, 
    deleteUser,
    loginAdmin,
    getCustomers,
    getAdmins,
    getUserById,
    resetPassword
}