const mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    author:{
        type:String,
        require:true,
    },
    rate:{
        type:Number,
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    content:{
        type:String,
    },
    active:{
        type:Boolean,
        default:false,
    }   
}, 
{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Review', reviewSchema);