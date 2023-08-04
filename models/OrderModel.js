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
                    variantId:{
                        type: mongoose.Schema.Types.ObjectId,
                    },
                    optionId:{
                        type: mongoose.Schema.Types.ObjectId,
                    }
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
    }
}, 
{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);