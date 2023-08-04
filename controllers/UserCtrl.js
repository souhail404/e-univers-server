// dependencies
const asyncHandler = require('express-async-handler');
const {generateToken} = require('../config/jwtToken')
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

    // create the new user
    const newUser = await User.create({...req.body, reviews:[]});

    res.json(newUser);
});

// Login USER
const loginUser = asyncHandler(async(req, res)=>{
    try{
        console.log(req.body);
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
            return res.status(404).json({error:'user not found'});
        }    

        // check if the password match 
        if(user.password === req.body.password){
            res.json({
                user:user.userName,
                email:user.email,
                token:generateToken(user._id)
            })
        }
        else{
            return res.status(404).json({error:'incorrect password'});
        } 
    }
    catch(err){
        return res.status(400).json({msg:'server error', error:err});
    }
})

// admin login
const loginAdmin = asyncHandler(async(req, res)=>{
    try{
        // check if already connected
        if(req.headers.authorization){
            return res.status(404).json({error:'you are already connected, please logout !'});
        };

        // find the user by email, username or mobile
        const user_ref = req.body.user_ref;

        const user = await User.findOne({mobile:user_ref}) || 
                     await User.findOne({user_name:user_ref}) || 
                     await User.findOne({email:user_ref});

        if(!user){
            return res.status(404).json({error:'user not found'});
        }    

        // check if the password match 
        if(user.password === req.body.password){
            if(user.role==='admin'){
                res.json({
                    user:user.user_name,
                    email:user.email,
                    token:generateToken(user._id)
                })
            }
            else{
                return res.status(400).json({error:'you are not an admin'});
            }
        }
        else{
            return res.status(404).json({error:'incorrect password'});
        } 
    }
    catch(err){
        return res.status(500).json({msg:'server error', error:err});
    }
})

// FIND ALL USERS
const getUsers = asyncHandler(async(req, res)=>{
    const user = await User.find({});
    if(user){ 
        res.json(user)
    }   
    else{
        res.json({msg:'There is no user'})
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
    loginAdmin
}