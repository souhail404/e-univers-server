const asyncHandler = require('express-async-handler');
const cloudinaryUploadImg = require('../utils/cloudinary');
const fs = require('fs')

const uploadImage = asyncHandler(async(req, res)=>{
    try {
        if(!req.files){
            res.status(400).json({message:'files missing'});
        }
        const uploader = (path) => cloudinaryUploadImg(path, 'images')
        const urls = [];
        const files = req.files;
        for(const file of files){
            const {path} = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json(error) 
    }
})

module.exports = {
    uploadImage
}