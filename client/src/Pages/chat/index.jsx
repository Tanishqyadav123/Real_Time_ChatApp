import ChatContainer from '@/myComponents/ChatContainer'
import ContactContainer from '@/myComponents/ContactContainer'
import EmptyContainer from '@/myComponents/EmptyContainer'
import { closeChat } from '@/redux/slices/chatSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Chat() {

    const data = useSelector((state) => state.user )



    const isChatSelected = useSelector((state) => state.chat)
    console.log("chat ", isChatSelected.chatType)

    // console.log(data)

  return (
    <div className='h-screen w-full bg-gray-900 flex gap-2'>
        <ContactContainer />
        {
           isChatSelected.chatType ?  <ChatContainer /> : <EmptyContainer/>
        }
    </div>
  )
}

export default Chat
