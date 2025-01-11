const { set } = require("mongoose");
const menuModel = require("../models/menu.model");

const showMenu = async (req, res) => {
  try {
    const menues = await menuModel.find({});
    if (!menues.length > 0) {
      return res
        .status(500)
        .json({ success: false, message: "menues not exists." });
    }

    return res
      .status(201)
      .json({ success: true, menues, message: "menu fetch successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal server error." });
  }
};

const addMenu = async (req, res) => {
  const { name, category, price, availability } = req.body;
  if (!name || !price) {
    return res
      .status(400)
      .json({ success: false, message: "name and price required." });
  }

  try {
    const newMenu = new menuModel({
      name,
      category,
      price,
      availability,
    });

    await newMenu.save();
    console.log(newMenu);
    return res
      .status(201)
      .json({ success: true, message: "menu added succussfully." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "internal server error." });
  }
};

const editMenu = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, availability } = req.body;
  if (!name || !price) {
    return res
      .status(400)
      .json({ success: false, message: "name and price required." });
  }
  try {
    const updatedData ={
        name,
        category,
        price,
        availability
    }

    const updatedMenu = await menuModel.findByIdAndUpdate(id,{$set:updatedData},{ new: true, runValidators: true });
    if (!updatedMenu) {
        return res.status(404).json({ success: false, message: "Menu item not found." });
      }
    return res.status(200).json({succuss:true, menu:updatedData , message:"menu updated successfully."}) ;

  } catch (err) {
    console.log(err);
    return res.status(500).json({succuss:false, message:"internal server error."}) ;
  }
};

const deleteMenu = async (req, res) => {
    const {id} = req.params ;

    try{
        const deletedMenu = await menuModel.findByIdAndDelete(id) ;
        console.log(deletedMenu) ;
        if(!deletedMenu){
           return res.status(404).json({success:false ,message:"Menu not found"}) ;
        }
        return res.status(200).json({success:true,message:"menu deleted successufully."}) ;
    }catch(err){
        console.error(err) ;
        return res.status(500).json({success:false,message:"internal server error."});
    }
};

module.exports = { addMenu, editMenu, deleteMenu, showMenu };
