const { default: mongoose } = require("mongoose");

const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"user",
        require:true
    },
    items:[{
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"menu",
            require:true
        },
        quantity:{
            type:Number,
            require:true,
            min:1
        }
    }],
    totalAmount:{
        type:Number,
        require:true,
        min:0
    },
    status:{
        type:String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
},{timestamps:true}) ;

const orderModel = mongoose.model("order",orderSchema) ;

module.exports = orderModel ;