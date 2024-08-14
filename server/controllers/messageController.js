const messageModel = require("../models/messageModel");

const getAllMessage = async (req , res) =>{
    
     try {
         const user1 = req.user._id;
         const {user2} = req.body;
          console.log("user1 " , user1)
          console.log("user2 " , user2)
         if (!user1 || !user2){
             return res.status(400).json({
                 success : false,
                 message : "Both Id's must be provided"
             })
         }

         const allMessages = await messageModel.find({
            $or : [
                {sender : user1 , receiver : user2},
                {sender : user2 , receiver : user1}
            ]
         })

         if (!allMessages){
             return res.status(400).json({
                 success : false,
                 message : "All Messages does not found"
             })
         }

         return res.status(200).json({
             success : true,
             message : "All Messages ",
             allMessages
         })


     }
     catch(error) {
        return res.status(500).json({
            success : false,
            message : error.message
        }) 
     }

}
module.exports = {getAllMessage}