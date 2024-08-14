import { color, getColor } from '@/color_Data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'


function Profile() {
  
  const navigate = useNavigate()
  const [userData , setUserData] = useState({email : "" , firstName : "" , lastName : "" , color : 0})

  const [image , setImage] = useState("")
  const [currentColor , setCurrentColor] = useState(0)
  const [hover , setHover] = useState(false)
  const fileInputFeild = useRef()

       const getUserInfo = async () => {
        
            try {
                 await axios.get("http://localhost:8080/api/v1/user/getUserInfo" , {withCredentials : true})
                 .then((value) =>{
                   console.log(value.data.authUser)
                   setUserData(value.data.authUser)
                   setImage(value.data.authUser.image)

                  
                   

                 })
                 .catch((error) =>{
                   console.log(error)
                 })
                 
            }
            catch(error) {
                console.log(error)
            }
            finally{
                console.log(userData)
            }

       }

       useEffect(() =>{
        
          getUserInfo ()

       } , [])

    
     const handleUserDataChange = (e) => {
      
           setUserData({...userData , [e.target.name] : e.target.value})

     }

     const handleColorChange = (index) =>{
      
          setUserData({...userData , color : index})
      
     }

     const handleOnMouseOver = () =>{
      console.log("onMouseOver")
        setHover(true)
     }
     const handleOnMouseLeave = () =>{
      console.log("onMouseLeave")
         setHover(false)
     }


     const handleSaveChanges = async () =>{
         console.log(userData)
         try {
             await axios.patch("http://localhost:8080/api/v1/user/updateProfile" , {...userData} ,{withCredentials : true})
             .then((value) =>{
                    console.log(value.data)
                    toast(value.data.message)
                    navigate ("/chat")
                    
             })
         }
         catch (error) {
            console.log(error)
            toast(error.response.data.message)
         }
     }


     const handleFileUpload = () =>{
           console.log("Click")
           fileInputFeild.current.click();


     }

     const handleProfileChange = async (e) =>{
       
          const file = e.target.files[0];

          const formData = new FormData()

          formData.append("image" , file)

          let userDetails = userData;

          const res = await axios.post("http://localhost:8080/upload" , formData)
          .then((value) =>{
              console.log(value.data)
              setUserData({...userDetails , image : value.data.imageUrl})
              toast("Profile Image Updated SuccessFully ")
          })
          .catch((error) =>{
             console.log(error)
             toast(error.response.data.message)
          })

     }


     const handleRemoveFile =  () =>{ 
         console.log("Handling the removal of file")
          
        //  Removal of Profile Image from frontend :-
        setUserData({...userData , image : ""})

     }
       
    

     




  return (
    <div className='h-screen w-full bg-gray-900 flex items-center justify-center flex-col gap-10'>
     <div className='flex items-center justify-center gap-12'>
          <div className="left mb-12 ">
            <Avatar className = "h-[32] w-[32]">
              {
                    userData.image && !hover ? <div><AvatarImage src = {userData.image} className= "object-cover w-[10rem] h-[10rem] relative " onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}/> {hover && userData.image ? <div className='flex items-center justify-center gap-8 flex-col'><div className=' cursor-pointer text-white text-[4rem] flex items-center justify-center mb-4 ' onClick={handleFileUpload} >+</div> <div className=' cursor-pointer text-white text-[4rem] flex items-center justify-center mb-4 ' onClick={handleFileUpload} >fsdfsdf</div></div> : ""}  </div>  :  
                    (<div className={`w-[10rem] h-[10rem]   text-center flex items-center justify-center rounded-full  ${getColor(userData.color)} text-7xl ${hover ? " opacity-40 transition-all delay-100" : ""} `} onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
                   
                {
                      
                    !hover ? userData?.firstName ? userData?.firstName?.split("").shift().toUpperCase() : userData?.email?.split("")?.shift()?.toUpperCase() : ""
                       
                      
 
                    }
                    {
                       hover && userData.image ?<div className='flex items-center justify-center gap-2 flex-col'>
                         <div className=' cursor-pointer text-white text-[4rem] flex items-center justify-center mb-4' onClick={handleFileUpload} >+</div><div className=' cursor-pointer text-white text-[4rem] flex items-center justify-center mb-4' onClick={handleRemoveFile} >-</div>
                       </div> : hover ? <div className=' cursor-pointer text-white text-[7rem] flex items-center justify-center mb-4' onClick={handleFileUpload} >+</div> : ""
                      }
                      <input type="file" hidden  name='image'  ref={fileInputFeild} onChange={(e) => handleProfileChange(e)} />
 
 
             </div>)
               }
             
              
            </Avatar>

          </div>
          <div className="right flex items-start justify-center flex-col gap-8">
           <div className='flex items-center justify-center gap-3 flex-col'>

           <Input placeholder = "Email" value = {userData.email} name = "email" className = "bg-gray-700 outline-none px-4 py-3 rounded-md w-[20vw] placeholder:text-gray-100 text-gray-100 shadow-[#454444] shadow-md font-semibold " onChange = {handleUserDataChange}/>
            <Input placeholder = "First Name" value = {userData.firstName} name = "firstName" className = "bg-gray-700 outline-0  px-4 py-3 rounded-md w-[20vw] placeholder:text-gray-100 text-gray-100 shadow-[#454444] shadow-md font-semibold" onChange = {handleUserDataChange}/>
            <Input placeholder = "Last Name" value = {userData.lastName}  name = "lastName" className = "bg-gray-700 outline-none px-4 py-3 rounded-md w-[20vw] placeholder:text-gray-100 text-gray-100 shadow-[#454444] shadow-md font-semibold" onChange = {handleUserDataChange}/>

           </div>
           <div className='flex items-center justify-center gap-4'>
             {
               color.map((singleColor , index) =>{
                   return <div  key={index} onClick={() => handleColorChange(index)} className={` ${index === userData.color ? "border-[2px] border-white" : ""} ${singleColor} h-[2rem] w-[2rem] rounded-full`}></div>
               })
             }
           </div>

          </div>
     </div>
     <Button onClick = {handleSaveChanges} className = "bg-purple-700 w-[30vw] hover:bg-purple-900 transition-all delay-300ms">Save Changes</Button>
    </div>
  )
}

export default Profile
