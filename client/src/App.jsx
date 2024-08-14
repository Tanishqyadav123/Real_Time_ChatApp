import React, { useEffect } from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter as Router , Routes , Route, Navigate, Outlet } from 'react-router-dom'
import Auth from './Pages/auth'
import Chat from './Pages/chat'
import Profile from './Pages/profile'
import { useDispatch, useSelector } from 'react-redux'
import PrivateRouter from './Pages/privateRoute'
import AuthRouter from './Pages/authRoute'
import { loginSuccess, logoutSuccess } from './redux/slices/userSlice'
import axios from 'axios'
function App() {


 


   const dispatch = useDispatch()
  // const PrivateRoute = ({children}) =>{
  //   const data = useSelector((state) => state.user)
  //       const isAuthenticated = !!data

  //       isAuthenticated ? <Outlet/> : <Navigate to={"/auth"}/>

  // }
  // const AuthRoute = ({children}) =>{
  //   const data = useSelector((state) => state.user)
  //       const isAuthenticated = !!data

  //       isAuthenticated ?  <Navigate to={"/chat"}/> : <Outlet/>

  // }
  const getAuthUser = async () =>{
        
    const res = await axios.get("http://localhost:8080/api/v1/user/getUserInfo" , {withCredentials : true})
    .then((value) =>{
      console.log(value.data)
      dispatch(loginSuccess(value.data.authUser))

    })
    .catch((error) =>{
      console.log(error)
    })
 }
 useEffect(() =>{
      getAuthUser()
  } , [])

   const handleLogout = () =>{
       dispatch(logoutSuccess())
   }
  return (
    <Router>
      
        <Routes>
        <Route  element = {<PrivateRouter />} >
        <Route path='/chat' element = {<Chat />} />
        <Route path='/profile' element = {<Profile />}/>
        </Route>
         
          <Route path='/auth' element = {<Auth  />}/>
         
          
          <Route path='*' element = {<Navigate to={"/auth"} />} />
        </Routes>
    </Router>
  )
}

export default App
