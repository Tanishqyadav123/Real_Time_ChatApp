const mongoose = require ("mongoose")
const bcrypt = require ("bcrypt")

const userSchema = new mongoose.Schema({
     firstName : {
         type : String,
         required : true,
         trim : true
     },
     password : {
         type : String,
         required : [true , "Password is required "],
         trim : true
     },
     cnfPassword : {
         type : String,
         required : [true , "cnfPassword is required "],
         trim : true
     },
     email : {
         type : String,
         required : [true , " Email is required "],
         trim : true
     },
     lastName : {
         type : String,
         required : true,
         trim : true
     },
     image : {
         type : String
     },
     color : {
         type : String
     },
     profileSetup : {
         type : Boolean,
         default : false
     }
} , {timestamps : true})


userSchema.pre("save" , async function (next) {
    
     if (this.isModified("password")){
         this.password = await bcrypt.hash(this.password , 10);
         this.cnfPassword = await bcrypt.hash(this.password , 10)
     }

     next();

})



userSchema.methods.comparePassword = async function (enteredPassword) {
    
         return await bcrypt.compare(enteredPassword , this.password)

}


module.exports = mongoose.models.User || mongoose.model ("User" , userSchema)

