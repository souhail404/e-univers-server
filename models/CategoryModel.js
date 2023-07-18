const mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique:true
    },
    description:{
        type: String,
        required:true, 
    },
},
{
    timestamps:true,
});

var SubCategorySchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category" 
    }
},
{
    timestamps:true,
});

//Export the model
const Category = mongoose.model('Category', CategorySchema);
const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

module.exports = {Category , SubCategory};
