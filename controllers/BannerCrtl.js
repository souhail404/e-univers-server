// dependencies
const asyncHandler = require('express-async-handler');
const fs = require('fs')

// models
const Banner = require('../models/BannerModel');
const cloudinaryUploadImg = require('../utils/cloudinary');
const deleteImage = require('../services/DeleteImage');

const createBanner = asyncHandler(async(req, res)=>{
    try {
        const {link} = req.body;
        const {desktopBanner , mobileBanner} = req.files;

        const uploader = (path) => cloudinaryUploadImg(path, 'banners')

        const desktopBannerData = await uploader(desktopBanner[0].path);
        const mobileBannerData = await uploader(mobileBanner[0].path);

        fs.unlinkSync(desktopBanner[0].path);
        fs.unlinkSync(mobileBanner[0].path); 

        const newBanner = await Banner.create({link, desktopBanner:desktopBannerData, mobileBanner:mobileBannerData})
        return res.status(200).json(newBanner)
    } catch (error) {
        return res.status(500).json({message:'internal server error' , error})
    }
});

const getBanners = asyncHandler(async(req, res)=>{
    try {
        const banners = await Banner.find({});
        return res.status(200).json({banners})
    } catch (error) {
        return res.status(500).json({message:'internal server error' , error})
    }  
});

const deleteBanner = asyncHandler(async(req, res)=>{
    try {
        const bannerId = req.params.bannerId;
        const banner = await Banner.findById(bannerId);
        if (!banner) {
            return res.status(404).json({message:"Banner Not Found"})
        }
        // delete images
        if(banner.desktopBanner.publicId){
            await deleteImage(banner.desktopBanner.publicId); 
        }
        if(banner.mobileBanner.publicId){
            await deleteImage(banner.mobileBanner.publicId);
        }
        

        const deletedBanner = await Banner.findByIdAndDelete(bannerId)
        return res.status(200).json({deletedBanner, message:"Banner Deleted Successfully"})
    } catch (error) {
        return res.status(500).json({message:'internal server error' , error})
    }   
});
 
module.exports = {
    createBanner,
    getBanners,
    deleteBanner
}