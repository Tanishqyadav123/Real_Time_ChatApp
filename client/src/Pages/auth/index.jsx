import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { registerSuccess , loginSuccess  } from '@/redux/slices/userSlice'
import { useDispatch , useSelector } from 'react-redux'

function Auth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


 

  const [isSelected , setIsSelected] = useState(false)

  const [signUpFormData , setSignUpFormData] = useState({})
  const [signInFormData , setSignInFormData] = useState({})
    
    const handleSignUp = async () =>{
      
            console.log(signUpFormData)
            const res = await axios.post("http://localhost:8080/api/v1/user/register" , signUpFormData , {withCredentials : true})
            .then((value) =>{
               console.log(value.data.message)
               toast(value.data.message)
               navigate ("/profile")
               dispatch (registerSuccess(value.data.newUser))
               
            })
            .catch((error) =>{
               console.log(error)
               toast(error.response.data.message)
            })

    }
    const handleSignIn = async () =>{
      console.log(signUpFormData)
      const res = await axios.post("http://localhost:8080/api/v1/user/login" , signInFormData , {withCredentials : true})
      .then((value) =>{
         console.log(value.data)
         toast(value.data.message)
         console.log(value.data.userExist.profileSetup)
        if (value.data.userExist.profileSetup){
             navigate("/chat")
        }
        else {
            navigate("/profile")
        }
        dispatch (loginSuccess(value.data.userExist))
         
      })
      .catch((error) =>{
         console.log(error)
         toast(error.response.data.message)
      })

    }

    const handleSignUpChange = (e) =>{
       
     setSignUpFormData({...signUpFormData , [e.target.name] : e.target.value})

    }
    const handleSignInChange = (e) =>{
       
     setSignInFormData({...signInFormData , [e.target.name] : e.target.value})

    }

   
 
   

    console.log(isSelected)
    
    return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center '>
      
   <div className='flex flex-col items-center justify-center gap-4 h-[max] w-[max] p-6 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] rounded'>

           <h1 className='text-5xl font-bold '>Welcome</h1>
          {
             !isSelected ?  <p>Select the Login and signUp option as per you are new or already a part!</p> : <p>Fill in the details to get started with the best chat app!</p> 
          }

           <div className='mt-12'>
    <Tabs defaultValue="login" className="w-[400px]" >
      <TabsList className="grid w-full grid-cols-2 mb-5"  >
        <TabsTrigger value="login" > <p onClick={() => setIsSelected(true)}> Login</p></TabsTrigger>
        <TabsTrigger value="signUp" > <p onClick={() => setIsSelected(true)}> SignUp</p></TabsTrigger>
      </TabsList>
      <TabsContent value="login">
      <Card>
        
        <CardContent className="space-y-2">
        

        <form action="">
        <div className="space-y-1">
            <Label htmlFor="current">Email</Label>
            <Input id="current"  name = "email" onChange = {handleSignInChange} type="email" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new"> Password</Label>
            <Input id="new" name = "password" onChange = {handleSignInChange} type="password" />
          </div>
        </form>
         
        </CardContent>
        <CardFooter>
          <Button onClick = {handleSignIn}> Sign In</Button>
        </CardFooter>
      </Card>
      </TabsContent>
      <TabsContent value="signUp">
        <Card>
        
          <CardContent className="space-y-2">
           <form action="">
           <div className="space-y-1 flex items-center justify-center gap-4 my-8">
              <Label htmlFor="current">FirstName</Label>
              <Input id="current" onChange = {handleSignUpChange} name = "firstName" type="text" />
              <Label htmlFor="current">LastName</Label>
              <Input id="current" onChange = {handleSignUpChange} name = "lastName" type="text" />
            </div>
            <div className="space-y-1 my-4">
              <Label htmlFor="current">Email</Label>
              <Input id="current"  onChange = {handleSignUpChange} name = "email" type="email" />
            </div>
            <div className="space-y-1 my-4">
              <Label htmlFor="new"> Password</Label>
              <Input id="new" onChange = {handleSignUpChange} name = "password" type="password" />
            </div>
            <div className="space-y-1 my-4">
              <Label htmlFor="new">Confirm Password</Label>
              <Input id="new" onChange = {handleSignUpChange} type="password" name = "cnfPassword" className = "outline-none" />
            </div>
           </form>
          </CardContent>
          <CardFooter>
            <Button onClick = {handleSignUp}>SignUp</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>


           </div>



   </div>
    </div>
  )
}

export default Auth
