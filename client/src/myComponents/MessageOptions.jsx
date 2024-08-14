import React, { useState } from 'react'
import NewDM from './NewDM';
function MessageOptions() {

   

  return (
    <div className='mt-5 ml-7 text-light uppercase text-gray-400  text-sm flex items-start justify-center flex-col gap-4'>
    <div className='flex items-center justify-between w-[100%] h-[5vh]'>
    <h2 className='cursor-pointer hover:text-gray-300 transition-all delay-50'>direct Message</h2>
    <NewDM  />
    </div>
    <div className='w-[100%] h-[5vh]'>
    <h2 className='cursor-pointer hover:text-gray-300 transition-all delay-50 '>Channels</h2>
    </div>
    
   
       
    </div>
  )
}

export default MessageOptions
