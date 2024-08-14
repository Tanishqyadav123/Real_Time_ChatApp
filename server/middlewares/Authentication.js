const jwt = require ("jsonwebtoken");
const userModel = require("../models/userModel");

const isAuthentication = async (req , res , next) =>{
     
     try {
        // console.log(req.cookies)
        const {token} = req.cookies;
        // console.log("token : " , token)

        if (!token){
             return res.status(402).json({
                 success : false,
                 message : "UnAuthorised Access Denied"
             })
        }

        const decoded =  jwt.verify(token , process.env.JWT_SECRET)

        // console.log(decoded)

        req.user = await userModel.findById(decoded.userId);
      
        // console.log(req.user)
        next();

     }
     catch (error) {
         return res.status(500).json({
             success : false,
             message : error.message
         })
     }

}


module.exports = isAuthentication;