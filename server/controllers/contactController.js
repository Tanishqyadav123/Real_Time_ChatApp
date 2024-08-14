const userModel = require("../models/userModel");

 
 const searchContact = async (req , res) =>{

    try {
         const {searchTerm} = req.body;
            console.log(searchTerm)

            if (searchTerm == " " || searchTerm == ""){
                return res.status(400).json({
                    success : false,
                    message : "SearchTerm is not valid!"
                 })
            }
         if (!searchTerm){
           
            return res.status(400).json({
                success : false,
                message : "SearchTerm is required!"
             })
            
         }

         const contacts = await userModel.find()
         const filteredContacts = contacts.filter((singleContact , index) =>{
            
                if ( singleContact._id.toString() !== req.user._id.toString()  && (singleContact.firstName.includes(searchTerm) || singleContact.lastName.includes(searchTerm) || singleContact.email.includes(searchTerm))){
                     return singleContact;
                }

         })

         return res.status(200).json({
             success : true,
             message : "All Related contacts ",
             filteredContacts
         })
    }
    catch (error) {
         return res.status(500).json({
            success : false,
            message : error.message
         })
    }
     
 }

 module.exports = {searchContact}