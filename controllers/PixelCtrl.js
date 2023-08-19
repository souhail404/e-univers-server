// dependencies
const asyncHandler = require('express-async-handler');


// models
const {FacebookPixels, TiktokPixels, SnapchatPixels} = require('../models/PixelModel');

// edit facebook pixels
const editFacebookPixels = asyncHandler(async(req, res)=>{
    try {
        const FbPixels = req.body.pixels;
        console.log(req.body.pixels);
        if(!FbPixels){
            return res.status(400).json({ message: 'Please send a valid data'});
        }
        await FacebookPixels.deleteMany({});
        FbPixels.forEach(async(pixel) => {
            await FacebookPixels.create({...pixel})
        });
        return res.status(200).json({mesage: "pixels updated successfully"});
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error:err });
    }
});

// edit tiktok pixels
const editTiktokPixels = asyncHandler(async(req, res)=>{
    try {
        const TkPixels = req.body.pixels;
        if(!TkPixels){
            return res.status(400).json({ message: 'Please send a valid data'});
        }
        await TiktokPixels.deleteMany({});
        TkPixels.forEach(async(pixel) => {
            await TiktokPixels.create({...pixel})
        });
        return res.status(200).json({mesage: "pixels updated successfully"});
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error:err });
    }
});

// edit snapchat pixels
const editSnapchatPixels = asyncHandler(async(req, res)=>{
    try {
        const SnPixels = req.body.pixels;
        if(!SnPixels){
            return res.status(400).json({ message: 'Please send a valid data'});
        }
        await SnapchatPixels.deleteMany({});
        SnPixels.forEach(async(pixel) => {
            await SnapchatPixels.create({...pixel})
        });
        return res.status(200).json({mesage: "pixels updated successfully"});
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error:err });
    }
});

// get facebook pixels
const getFacebookPixels = asyncHandler(async(req, res)=>{
    try {
        const pixels = await FacebookPixels.find({});
        return res.status(200).json(pixels);
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error:err });
    }
});

// get tiktok pixels
const getTiktokPixels = asyncHandler(async(req, res)=>{
    try {
        const pixels = await TiktokPixels.find({});
        return res.status(200).json(pixels);
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error:err });
    }
});

// get snapchat pixels
const getSnapchatPixels = asyncHandler(async(req, res)=>{
    try {
        const pixels = await SnapchatPixels.find({});
        return res.status(200).json(pixels);
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error:err });
    }
});

module.exports = {
    editFacebookPixels, 
    editTiktokPixels, 
    editSnapchatPixels,
    getFacebookPixels,
    getTiktokPixels,
    getSnapchatPixels,
}