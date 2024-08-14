const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")
const path = require("path")
const {renameSync} = require("fs")

const register = async (req , res , next) =>{

       try {
        

           const {firstName , lastName , password , email , cnfPassword } = req.body;
             
           console.log(firstName , lastName , password , email , cnfPassword)

          if (!firstName || !lastName || !password || !email || !cnfPassword){
            
              return res.status(400).json({
                 success : false,
                 message : "Please fill all the fields "

              })

          }

        // Check is the User Previous Exist or not :-

        const userExist = await userModel.findOne({
             email : email
        })

        if (userExist){
            
           return res.status (400).json({
             success : false,
             message : "User Already exist with this email"
           })

        }


        if (password != cnfPassword){
            return res.status (400).json({
                success : false,
                message : "Both Password and ConfirmPassword Should be Same"
              })
        }




        const newUser = await userModel.create({
             firstName,
             lastName,
             email,
             password,
             cnfPassword
             
        })

        // Generate the JwT token :-
        const token =  jwt.sign({userId : newUser._id} , process.env.JWT_SECRET)

        if (!token){
             return res.status (400).json({
                 success : false,
                 message : "Token could not generated"
             })
        }
 
         res.cookie("token" , token , {
             httpOnly : true,
             secure : true,
             maxAge : 15*24*60*60*1000

         })
        
        return res.status(200).json({
            success : true,
            message : "User created Successfully",
            newUser
        })


       }
       catch (error) {
        
         return res.status(500).json({
             success : false,
             message : error.message
         })

       }
    
}


const login = async (req , res , next) =>{

     try {
        
        const {email , password} = req.body

        if ( !password || !email){
            
            return res.status(400).json({
               success : false,
               message : "Please fill all the fields "

            })

        }

          // Check is the User Previous Exist or not :-

          const userExist = await userModel.findOne({
            email : email
       })

       if (!userExist){
           
          return res.status (400).json({
            success : false,
            message : "Please register first"
          })

       }

    //    Check password

    const isMatch = await userExist.comparePassword (password)

    if (!isMatch){
         return res.status(400).json({
            success : false,
            message : "Invalid Credentails"
        })
    }

      // Generate the JwT token :-
      const token =  jwt.sign({userId : userExist._id} , process.env.JWT_SECRET)

      if (!token){
           return res.status (400).json({
               success : false,
               message : "Token could not generated"
           })
      }

       res.cookie("token" , token , {
           httpOnly : true,
           secure : true,
           maxAge : 15*24*60*60*1000,
           sameSite : "None"

       })
      
      return res.status(200).json({
          success : true,
          message : "User LoggedIn Successfully",
          userExist
      })


        
     }
     catch (error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
     }

     
}

const getUserInfo = async (req , res , next) =>{
    
    try {
        
       if (!req.user){
         return res.status(400).json({
             success : false,
             message : "User Does not exist"
         })
       }

       return res.status(200).json({
         success : true,
         message : "Auth User ",
         authUser : req.user
       })



    }
    catch (error){
        
         return res.status(500).json({
             success : false,
             message : error.message
         })

    }

}


const UpdateProfile = async (req , res , next) =>{
    
      try {
        
          const authUser = req.user;

          console.log("Mera Naam")
          const {firstName , lastName , email , color , image} = req.body
           
          if (!authUser){
             return res.status (400).json({
                 success : false,
                 message : "User is not present "
             })
          }

          const updatedUserProfile = await userModel.findByIdAndUpdate(authUser._id , {
            firstName,
            lastName,
            email,
            color,
            profileSetup : true,
            image

          } , {new : true})

          if (!updatedUserProfile){
            return res.status (400).json({
                success : false,
                message : "Profile could not update... Please Try again"
            })
          }

          return res.status (200).json({
            success : true,
            message : "Profile Updated SuccessFully ",
            updatedUserProfile
        })

          

      }
      catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })

      }

}

const addProfileImage = async (req , res) =>{

     try {
      
           if(!req.file){
              return res.status(400).json({
                 success : false,
                 message : "File is not provided"
              })
           }
         let fileName = 'uploads/profile/' + Date.now() + req.file.originalname
         console.log(fileName)
         renameSync(req.file.path , fileName)

            const updatedUser = await userModel.findByIdAndUpdate(req.user._id , {
               image : fileName
            } , {new : true})

            if (!updatedUser){
                return res.status (400).json({
                   success : false,
                   message : "Profile is not updated "
                })
            }

         return res.status (200).json({
          success : true,
          message : "Profile Image Updated SuccessFully",
          updatedUser
         })
     }
     catch (error) {
       return res.status(500).json({
         success : false,
         message : error.message
       })
     }
}


const removeUploadedFile = async (req , res) =>{
  
      const authUser = req.user;

      console.log(authUser)
      res.send("Removal Of profile")

}
 
const logoutUser = async (req , res , next) =>{
  
      try {
         const authUser = req.user
         console.log(authUser)
         
          
       res.cookie("token" , "" , {
        httpOnly : true,
        secure : true,
        maxAge : 0

    })

    res.status(200).json({
       success : true,
       message : "User Logout SuccessFully"
    })

  }
      catch (error) {
         return res.status(500).json({
           success : false,
           message : error.message
         })
      }

}


module.exports = {register , login , getUserInfo , UpdateProfile , addProfileImage , removeUploadedFile , logoutUser }