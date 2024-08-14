import { getColor } from '@/color_Data'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdEdit } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import { logoutSuccess } from '@/redux/slices/userSlice'

function UserInfo() {

   
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data , setData] = useState({})
    const getAuthUser = async () =>{
        
       const res = await axios.get("http://localhost:8080/api/v1/user/getUserInfo" , {withCredentials : true})
       .then((value) =>{
        console.log(value.data.authUser)
        setData(value.data.authUser)

       })
       .catch((error) =>{
         console.log(error)
       })
    }

    const handleLogout = async () =>{

            const res = await axios.get("http://localhost:8080/api/v1/user/logoutUser" , {withCredentials : true})
            .then((value) =>{
                 console.log(value.data)
                 dispatch(logoutSuccess())
                 navigate("/auth")

                 

            })
            .catch ((error) =>{
                  console.log(error)
            })

    }
    useEffect(() =>{
         getAuthUser()
     } , [])

     
  return (
    <div className='h-[8vh] w-[100%] bg-gray-700 opacity-80 rounded-lg px-4 pt-1  flex items-center justify-center'>
     
         <div className='flex items-center justify-start gap-4'>

             <Avatar>

                {
                     data.image ? <AvatarImage className = "rounded-full h-12 w-12 object-cover" src = {data.image} >

                 
                     </AvatarImage> : <div className={`h-10 w-10 text-center px-2 text-xl pt-2 ${getColor(data.color)} `}>
                         {data?.firstName ? data?.firstName?.split("").shift().toUpperCase() : data?.email?.split("").shift().upperCase()}
                     </div>
                }

             </Avatar>
             <div className='flex gap-1'>
             <h2 className='text-white font-bold text-sm'>{data?.firstName}</h2>
             <h2 className='text-white font-bold text-sm'>{data?.lastName}</h2>
             </div>
                
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <MdEdit onClick={() => navigate ("/profile")} color={`${getColor(data.color)}`}/>
                </TooltipTrigger>
                <TooltipContent className='bg-gray-800 text-white'>
                <p >Edit</p>
                </TooltipContent >
            </Tooltip>
       </TooltipProvider>
       <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <AiOutlineLogout onClick={handleLogout} color="red"/>
                </TooltipTrigger>
                <TooltipContent className='bg-gray-800 text-white'>
                <p>Logout</p>
                </TooltipContent >
            </Tooltip>
       </TooltipProvider>



         </div>  
       
    </div>
  )
}

export default UserInfo
