const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    items:[
        {
            quantity:{
                type:Number,
                default:1
            },
            itemId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            itemName:String,
            itemOptions:[
                {   
                    variant:{
                        type:String,
                    },
                    variantId:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref:'Product.variants'
                    },
                    optionId:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref:'Product.variants.options'
                    },
                    option:{
                        type:String,
                    },
                }
            ],
            itemPrice:Number,
            itemTotalPrice:Number,
        }
    ],
    shippingAddress:{
            country:{
                type:String,
            },
            city:{
                type:String,
            },
            zip:{
                type:Number,
            },
            street:{
                type:String,
            },
            houseNumber:{
                type:Number,
            } 
    },
    orderState:{
        type:String,
        enum:['pending','processing','delivered','backorder'], 
        default:'pending',
    },
    total:Number,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    user:{
        fullName:String,
        mobile:Number,
    },
    backorderAt:Date,
    deliveredAt:Date,
}, 
{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);