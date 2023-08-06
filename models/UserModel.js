const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    addresses:[
        {
            country:{
                type:String,
                required:true,
            },
            city:{
                type:String,
                required:true,
            },
            zip:{
                type:Number,
                required:true,
            },
            street:{
                type:String,
                required:true,
            },
            houseNumber:{
                type:Number,
                required:true,
            } 
        }
    ],
    role:{
        type: String,
        enum: ['customer', 'admin'],
        default:'customer'
    },
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Order",
        }
    ],
    cart:[
        {
            item:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            quantity:{
                type:Number,
                default:1
            },
            price:{
                type:Number,
                require:true,
            }
        }
    ],
    wishlist:[
        {
            item:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
            }
        }
    ],
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
}, 
{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('User', userSchema);