const { default: mongoose } = require("mongoose");

const menuSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim: true
    },
    category:{
        type:String,
        enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Salads', 'Soups'],
        default: 'Main Course'
    },
    price:{
        type:Number,
        require:true,
        min: 0
    },
    availability:{
        type:Boolean,
        default:true
    }
},{ timestamps: true });

const menuModel = mongoose.model("menu",menuSchema) ;
module.exports = menuModel ;