const userModel = require("../models/user.model") ;
const jwt = require("jsonwebtoken") ;
const validater = require("validator") ;
const bycrypt = require("bcryptjs") ;

const createToken = (id) =>{ 
return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"}) ;
}
const registerUser = async(req,res) =>{
    const {username,email,password} =req.body ;

    if(!username || !email || !password){
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if(!validater.isEmail(email)){
        return res.status(400).json({success:false ,message:"email id is not correct"}) ;
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    try{
        const userExist = await userModel.findOne({username}) ;
        if(userExist){
           return res.status(400).json({success:false,message:"user already exists."});
        }
        const salt = await bycrypt.genSalt(10); 
        const hashedPassword = await bycrypt.hash(password,salt);

        const newUser = new userModel({
            username,
            email,
            password:hashedPassword
        })

        const user =await newUser.save() ;
        const token = createToken(user._id) ;
        console.log(token) ;
        return res.status(201).json({success:true,token,message:"user register successfully."});
    }catch(error){
        res.status(500).json({success:false,message:"server error"}) ;
    }
};

const loginUser = async(req,res)=>{
    const {username,password} = req.body ;
    if(!username || !password){
        return res.status(400).json({success:false ,message:"All field are required."});
    }
    
    try{
        const user = await userModel.findOne({username}) ;

        if(!user){
            return res.status(400).json({success:false , message:"user does not exists."});
        }
        const isMatch = await bycrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid credentials."});
        }

        const token = createToken(user._id) ;
        console.log(token) ;
        return res.status(201).json({success:true, token}) ;

    }catch(err){
        return res.status(500).json({success:false,message:"internal server error."}) ;
    }


}

module.exports = {registerUser,loginUser} ;