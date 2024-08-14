import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate , Outlet } from 'react-router-dom'


function AuthRouter({children}) {

    const data = useSelector((state) => state.user)

    console.log(data)

    const isAuthenticated = data.isLoggedIn





  return (
      <>
      {
         isAuthenticated ?<Navigate to={"/chat"} />: <Outlet /> 
      }
      </>
  )
}

export default AuthRouter
