const dotenv = require("dotenv");
dotenv.config() ;
const express = require("express") ;
const { connectDB } = require("./db/db");
const userRoute = require("./routes/user.routes");
const menuRoute = require("./routes/menu.routes");
const orderRoute = require("./routes/order.routes");
const cors = require("cors") ;

const app = express() ;
const port = 3000;

connectDB();
app.use(cors()) ;
app.use(express.json()) ;
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("<h1>Hello World<h1>");
});


app.use("/",menuRoute) ;
app.use("/",orderRoute) ;
app.use("/",userRoute) ;


app.listen(port,()=>{
    console.log(`app is listening on port ${port}.`);
})