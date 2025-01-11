const jwt = require("jsonwebtoken") ;

const authMiddleware = (req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({success:false ,message:"access denied."});
    }
    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = verified.id;
        next() ;
    }catch(err){
        return res.status(500).json({success:false,message:"something wents wrong."}) ;
    }
}

module.exports = authMiddleware ;