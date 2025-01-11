const menuModel = require("../models/menu.model");
const orderModel = require("../models/order.model");

const placeOrder = async(req,res)=>{ 
    const userId = req.body.userId ;
    const {items} = req.body ;

    try{
        if(!items || items.length == 0){
            return res.status(401).json({success:false,message:"item not exists."});
        }

        let totalAmount = 0 ;

        for(const item of items){
            const menuItem = await menuModel.findById(item._id);
            if(!menuItem){
                return res.status(401).json({success:true,message:`menu item with itemID ${item.itemId} not found`}) ;
            }

            totalAmount += item.quantity * menuItem.price ;
        }

        const order = new orderModel({
            userId,
            items,
            totalAmount,
            status:"Pending"
        });
 
        const savedOrder = await order.save() ;
        console.log(savedOrder) ;
        return res.status(201).json({success:true,message:"Order place successfully.",order:savedOrder}) ;

    }catch(err){
        console.error(err) ;
        return res.status(500).json({success:false,message:"Internal server error."});
    }
};

const showOrders = async(req,res)=>{
    const userId = req.body.userId ;

    try{
        const orders = await orderModel.find({userId}).populate("items.itemId","name price");
        console.log(orders) ;
        return res.status(200).json({success:true,orders}) ;
    }catch(err){
        console.error('Error fetching orders:', err);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};



module.exports = {placeOrder,showOrders} ;