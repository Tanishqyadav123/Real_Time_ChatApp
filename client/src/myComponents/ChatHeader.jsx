import { getColor } from '@/color_Data';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { closeChat } from '@/redux/slices/chatSlice';
import React from 'react'
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
function ChatHeader() {

   const dispatch = useDispatch()
   const data = useSelector((state) => state.chat).chatData 
    
   console.log(data)
   
  const handleCloseChat = () =>{
      console.log("Click On Close Chat")
      dispatch(closeChat())
  
     }
  return (
    <div className='h-[10vh] w-[100%] flex items-center justify-start px-4 border-b-2 border-gray-700'>
       <Avatar>

{
    data.image ? <AvatarImage className = "rounded-full h-12 w-12 object-cover" src = {data.image} >

 
     </AvatarImage> : <div className={`h-10 w-10 text-center px-2 text-xl pt-2 ${getColor(data.color)} `}>
         {data?.firstName ? data?.firstName?.split("").shift().toUpperCase() : data?.email?.split("").shift().upperCase()}
     </div>
}

</Avatar>
<div className='flex gap-1 mx-2'>
<h2 className='text-white font-bold text-sm'>{data?.firstName}</h2>
<h2 className='text-white font-bold text-sm'>{data?.lastName}</h2>
</div>
      <MdClose onClick={handleCloseChat} className='px-2 cursor-pointer' size={"2.5rem"}/>

    </div>
  )
}

export default ChatHeader
