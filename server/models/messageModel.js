const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
     sender : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "User",
         required : true
     },
     receiver : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "User" 
     },
     messageType : {
         type : String,
         Enumerator : ["text" , "file"],
         required : true
     },
     messageContent : {
         type : String,
         required : function(){
             return this.messageType === "text"
         }
     },
     fileUrl : {
         type : String,
         required : function (){
             return this.messageType === "file"
         }
     }
} , {timestamps : true})

module.exports = mongoose.model("message" , messageSchema)