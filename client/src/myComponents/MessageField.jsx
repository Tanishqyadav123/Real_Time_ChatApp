import { RiAttachment2 } from "react-icons/ri";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import  { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';
import { useSocket } from '@/Context/socketContext';

function MessageField() {

    const [message , setMessage] = useState("")
    const socket = useSocket()
    
    const {chatType , chatData} = useSelector((state) => state.chat)
    const {userInfo} = useSelector((state) => state.user)
    const [isEmojiPickerOpen , setIsEmojiPickerOpen] = useState(false)

    const handleMessageChange = (e) =>{
        setMessage(e.target.value)
    }

     const handleAddEmoji = (e) =>{
         console.log(e.emoji)
         setMessage((prevMessage) => prevMessage+e.emoji)
         console.log(message)
     }
     const handleSendMessage = async () =>{
         
        // Trigger the sendMessage event :-
        if (chatType === "contact"){
       
          console.log(userInfo._id) 
          console.log(chatData._id)
          socket.current.emit("sendMessage" , {
            sender : userInfo._id,
            receiver : chatData._id,
            messageType : "text",
            messageContent : message,
            fileUrl : undefined
          })      
          
          
           
        }

        setMessage("")

     }

  return (
    <div className='w-[100%] px-4 flex items-center justify-center gap-4'>
      <div className=' px-2 relative w-[37vw] bg-gray-800 h-[6vh] flex items-center justify-start  rounded-md '>
        <input type= "text" placeholder = "Message..." className = " border-none bg-transparent outline-none focus:outline-none focus:border-none w-[32vw]  " onChange={handleMessageChange} value={message} />
        <button className='absolute right-2' >
            <RiAttachment2 size={"1.3rem"} />
        </button>
        <button className='absolute right-10' >
            <GrEmoji size={"1.3rem"} onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} />
            
        </button>
        <EmojiPicker onEmojiClick={handleAddEmoji} theme='dark' className='absolute left-[8rem] bottom-[14rem] transition-all delay-200 ease-in-out' height={"20rem"} open = {isEmojiPickerOpen} width={"35rem"} />
      </div>
      <button className='bg-purple-600 p-3 rounded-md' onClick={handleSendMessage}>
        <IoSend />
      </button>
    </div>
  )
}

export default MessageField
