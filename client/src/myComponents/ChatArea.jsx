import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import { addMessage } from '@/redux/slices/chatSlice'
function ChatArea() {

  const {chatMessageData , chatData} = useSelector((state) => state.chat)
  const {userInfo} = useSelector((state) => state.user)
  const dispatch = useDispatch()

   console.log(chatData._id)
  const getAllMessages = async () =>{
     const res = await axios.post("http://localhost:8080/api/v1/message/allMessages" , {user2 : chatData._id} ,{withCredentials : true})
     .then((value) =>{
   //     console.log("dskjhdfkgdjyusfcgjh" ,value.data.allMessages[0])

   //   for (let i = 0; i < value.data.allMessages.length ; i++){
   //    dispatch(addMessage([...chatMessageData ,  {...value.data.allMessages[i] , message : value.data.allMessages[i].messageContent , sender : value.data.allMessages[i].sender , receiver : value.data.allMessages[i].receiver , createdAt : value.data.allMessages[i].createdAt}]))
   //   }

       
       
     })
     .catch((error) =>{
       console.log(error)
     })
  }
  useEffect(() =>{
    getAllMessages ()
  } , [])

  console.log(chatMessageData)

  
   const renderMessage = (message) =>{
       return <div className={` my-4 ${userInfo._id === message.sender ? "text-right": "text-left"}`}>
           <div className={` flex items-center justify-start flex-col ${userInfo._id === message.sender ? "bg-transparent text-purple-400": "bg-transparent text-gray-200"}`}>
             {message.message}
             <span className='text-xs text-gray-600'>{moment(message.createdAt).format("LT")}</span>
            </div>        
       </div>
   }

  return (
    <div className='h-[75vh] w-full  flex items-center justify-center '>
       <div className= {`flex flex-col  h-[100%] w-[100%]  `}>
          {
             chatMessageData.map((element , index) =>{
                 return <div key={index} className={`flex ${userInfo._id === element.sender ? "justify-end" : "justify-start"}  w-[70vw]`}>
                    { renderMessage (element)}
                  </div>;
             })
          }
       </div>
    </div>
  )
}

export default ChatArea
