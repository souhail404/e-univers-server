const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slugTitle:{
        type:String,
        required:true,
    },
    miniDescription:{
        type:String,
    },
    description:{
        type:String,
    },
    sellPrice:{
        type:Number,
        required:true
    },
    comparePrice:{
        type:Number,
    },
    costPrice:{
        type:Number,
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
            url:String,
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
    addedToCart:{
        type:Number,
        default:0,
    },
    ordered:{
        type:Number,
        default:0,
    },
    hasVariants:{
        type:Boolean,
        default:false,
    },
    variants:[
        {
            name:{
                type:String,
                required:true,
            },
            options:[
                {
                    value:{
                        type:String,
                        required:true,
                    },
                    priceDef:{
                        type:Number,
                        default:0
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
            userId:{
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
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product" 
    }
}, 
{
    timestamps:true,
});


//Export the model
const Product =  mongoose.model('Product', productSchema);
const ProductImage =  mongoose.model('ProductImage', productImageSchema);

module.exports = {Product, ProductImage};