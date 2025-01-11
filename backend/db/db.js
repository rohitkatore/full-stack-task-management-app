const mongoose = require("mongoose") ;
const url = process.env.MONGODB_URL;

 connectDB = async () =>{
    await mongoose.connect(url).then(()=>
        console.log("DB connected.")
    )
}

module.exports = {connectDB} ;
