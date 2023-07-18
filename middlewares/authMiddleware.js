const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async(req, res, next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token =req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token , process.env.SECRET_KEY);
                const user = await User.findOne({_id:decoded?.id}) 
                if(!user){
                    throw Error("This user is no longer exist")
                }
                req.user=user;
                next()
            }
        }
        catch(error){
            throw Error("you are not authorized for this action")
        }
    }
    else{
        throw Error("there is no token in the header")
    }
})

const isAdmin = asyncHandler(async(req, res, next)=>{
    const {email , user_name} = req.user;
    const user = await User.findOne({email, user_name});
    const role = user.role;
    if(role){ 
        if(role==='admin'){
            next()
        }
        else{
            throw Error('you are not an admin')

        }
    }
    else{
        throw Error('you are not an admin')
    }
})



module.exports = {authMiddleware , isAdmin}