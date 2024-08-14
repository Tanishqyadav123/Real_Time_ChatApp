import { addMessage } from "@/redux/slices/chatSlice";
import { createContext , useEffect , useRef , useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {io} from 'socket.io-client'



const socketContext = createContext(null)

// Reusable components for useContext of socketContext :-
export const useSocket = () =>{
     return useContext(socketContext);
}


export const SocketProvider = ({children}) =>{

    const dispatch = useDispatch()
    
    const socket = useRef()
    const {chatType , chatData } = useSelector((state) => state.chat)

    const {userInfo} = useSelector((state) => state.user)


    useEffect(() =>{
        
        if (userInfo){
            
             socket.current = io("http://localhost:8080" , {
                   withCredentials : true,
                   query : {
                     userId : userInfo._id
                   }
             })

             socket.current.on("connect" , () =>{
                 console.log("user connected to socket server")
             })

               console.log("receive")

             const handleReceiveMessage = (message) => {
                  console.log("receive function")
                  console.log(message)

                 if (chatType !== undefined && (chatData._id === message.sender._id || chatData._id === message.receiver._id)){

                       console.log("Receive Message ", message )
                    
                      dispatch(addMessage(message))

                 }
                 


             }
             console.log(socket.current)

             socket.current.on("receiveMessage" , handleReceiveMessage)

             // Clean up function :-
             return () =>{
                //    console.log("object")
                  socket.current.disconnect();
             }
        }


    } , [userInfo])

    return <socketContext.Provider value={socket}>
        {children}
        </socketContext.Provider>

}


