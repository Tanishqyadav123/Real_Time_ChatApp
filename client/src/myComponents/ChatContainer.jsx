import React from 'react'
import ChatHeader from './ChatHeader'
import ChatArea from './ChatArea'
import MessageField from './MessageField'

const ChatContainer = () => {
  return (
    <div className='h-screen w-[100%] text-white pt-7'>
       <ChatHeader />
       <ChatArea/>
       <MessageField />
    </div>
  )
}

export default ChatContainer
