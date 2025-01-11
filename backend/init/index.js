const mongoose = require("mongoose") ;
const menuModel = require("../models/menu.model");
const sampleMenuData = require("./data");

const url = "mongodb://0.0.0.0/food-order" ;

async function main(){
   await mongoose.connect(url).then(()=>
    console.log("connected to DB.")
).catch((err)=>
    console.log(err)
)
};

main() ;

const initDB = async()=>{
    await menuModel.deleteMany({}) ;
    await menuModel.insertMany(sampleMenuData) ;
    console.log("menu is inisilize.");
}

initDB() ;