const {Server : socketIOServer} = require("socket.io")
const messageModel = require("./models/messageModel")


const setUpSocket = (server) =>{
    
    
     const io = new socketIOServer(server , {
         
            cors : {
                 origin : process.env.ORIGIN,
                 methods : ["GET" , "POST"],
                 credentials : true
            }

     })

    //   Creating a map for storing the mapping of userId with their socketId :-
    const userSocketMap = new Map()


    const disconnectSocket = (socket) =>{

           console.log("disconnected ")
         console.log(`User disconnected successFully with socketId : ${socket.id}`)
 
          for (const [userId, socketId] of userSocketMap.entries()){
            
              if (socketId === socket.id){
                  userSocketMap.delete(userId)
                  break;
              }

          }

    }

   async function sendNewMessage (message){
        console.log("Creating the message")
        const senderSocketId = userSocketMap.get(message.sender);
        const receiverSocketId = userSocketMap.get(message.receiver);

        // Create the message in DB :-
        const createdMessage = await messageModel.create(message)

        if (!createdMessage){
              console.log("Message could not created ")
        }

        // Fetch the details of the sender and receiver :-
        const messageData = await messageModel.findById(createdMessage._id)
        .populate("sender" , "_id email firstName  lastName  image  color")
        .populate("receiver"  ,"_id email firstName  lastName  image  color")

        // if receiver is online :-
        if (receiverSocketId){
            
              io.to(receiverSocketId).emit("receiveMessage" , messageData);

        }

        // if sender is also online :-
        if (senderSocketId){
             io.to(senderSocketId).emit("receiveMessage" , messageData);
        }

    }

    io.on("connection" , (socket) =>{
        
        const userId = socket.handshake.query.userId;
        if (userId){
            // Storing the mapping :-

            userSocketMap.set(userId , socket.id)
            console.log(`User connected with userId : ${userId} and socketId : ${socket.id} `)


        }
        else {
            console.log(`UserId is not provided during connection `)
             
        }
        console.log(userSocketMap)
        socket.on("sendMessage" , sendNewMessage);
        

        // Raising the event on disconnecting :-
        socket.on("disconnect" , () =>{ disconnectSocket(socket)});
    })



}


module.exports = setUpSocket;