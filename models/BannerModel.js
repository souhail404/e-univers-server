const mongoose = require('mongoose');

var bannerSchema = new mongoose.Schema({
    desktopBanner:{
        url:String,
        publicId:String,
    },
    mobileBanner:{
        url:String,
        publicId:String,
    },
    link:String,

}, 
{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Banner', bannerSchema);