const mongoose = require("mongoose") ;
const url = "mongodb://0.0.0.0/food-order" ;

 connectDB = async () =>{
    await mongoose.connect(url).then(()=>
        console.log("DB connected.")
    )
}

module.exports = {connectDB} ;