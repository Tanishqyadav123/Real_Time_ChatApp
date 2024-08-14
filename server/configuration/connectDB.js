const mongoose = require("mongoose")

const connectDB = async() =>{
    
      try {
        
         await mongoose.connect(process.env.MONGO_URI)
          .then(() =>{
             console.log(`Database connected successfully `)
          })

      }
      catch(error) {
        console.log(`SomeThing Went wrong while connecting with database `)
         
      }

}


module.exports = connectDB