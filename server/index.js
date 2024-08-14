const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")
const multer = require("multer")
const path = require ("path")
const connectDB = require("./configuration/connectDB")


const contactRouter = require("./router/contactRouter.js")
const userRouter = require ("./router/userRouter.js")
const messageRouter = require("./router/messageRouter.js")
const setUpSocket = require("./socket.js")



const app = express()



connectDB()

app.use(cors({
     origin : [process.env.ORIGIN],
     methods : ["GET" , "POST" , "PATCH" , "PUT" , "DELETE"],
     credentials : true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))




// Setting up the Routes :-
app.use("/api/v1/user" , userRouter)
app.use("/api/v1/contact" , contactRouter)
app.use("/api/v1/message" , messageRouter)



// Image uploadation using multer :-
const storage = multer.diskStorage({
     destination : "./uploads/images",
     filename : (req , file , cb) => {
          
            return cb (null , `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

     }
})

const upload = multer({storage : storage})

// Middleware for file uploadation :-
app.use('/images' , express.static("uploads/images"))

app.post("/upload" , upload.single("image") , function (req , res) {
       
        console.log(req.file);

        if (req.file){
           res.status(200).json({
                success : true,
                message : "Profile Updated SuccessFully ",
                imageUrl : `http://localhost:${process.env.PORT}/images/${req.file.filename}`
           })
        }

})









app.get("/" , function (req , res){
    
     res.send("Hello App")

})


const server = app.listen(process.env.PORT , () =>{
     console.log(`Server is running on the PORT : ${process.env.PORT}`)
})

// Creating a function

setUpSocket (server);

