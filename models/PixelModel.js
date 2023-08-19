const mongoose = require('mongoose');

var FacebookPixelSchema = new mongoose.Schema({
    script:String,
}, 
{
    timestamps:true,
});

var TiktokPixelSchema = new mongoose.Schema({
    script:String,
}, 
{
    timestamps:true,
});

var SnapchatPixelSchema = new mongoose.Schema({
    script:String,
}, 
{
    timestamps:true,
});

//Export the model
const FacebookPixels = mongoose.model('FacebookPixel', FacebookPixelSchema);
const TiktokPixels = mongoose.model('TiktokPixel', TiktokPixelSchema);
const SnapchatPixels = mongoose.model('SnapchatPixel', SnapchatPixelSchema);

module.exports = {FacebookPixels, TiktokPixels, SnapchatPixels}