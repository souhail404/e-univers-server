const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    mini_description:{
        type:String,
    },
    description:{
        type:String,
    },
    stock:{
        type:Number,
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category" 
    },
    subcategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"SubCategory" 
    },
    images:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"ProductImage" 
        }
    ],
    active:{
        type:Boolean,
        default:true    
    },
    liked:{
        type:Number,
        default:0,
    },
    added_to_cart:{
        type:Number,
        default:0,
    },
    ordered:{
        type:Number,
        default:0,
    },
    variants:[
        {
            name:{
                type:String,
                required:true,
            },
            options:[
                {
                    option:{
                        type:String,
                        required:true,
                    },
                    value:{
                        type:String,
                        required:true,
                    },
                    price_def:{
                        type:Number,
                        required:true,
                        default:0
                    },
                    image:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref:"ProductImage" 
                    },
                    available:{
                        type:Boolean,
                        default:true,
                    }
                }
            ]
        }
    ],
    reviews:[
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User" 
        },
        author:{
            type: String,
            required:true,
        },
        rate:{
            type: Number,
            required:true,
        },
        title:{
            type: String,
        },
        comment:{
            type: String,
        },
        active:{
            type:Boolean,
            default:true
        }
    }
    ]
}, 
{
    timestamps:true,
});


var productImageSchema = new mongoose.Schema({
    image_url:{
        type: String,
        required:true,
    },
}, 
{
    timestamps:true,
});


//Export the model
const Product =  mongoose.model('Product', productSchema);
const ProductImage =  mongoose.model('ProductImage', productImageSchema);

module.exports = {Product, ProductImage};