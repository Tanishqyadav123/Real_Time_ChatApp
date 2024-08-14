import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate , Outlet, useParams } from 'react-router-dom'


function PrivateRouter({children}) {

    const data = useSelector((state) => state.user)

    console.log(data)

    const isAuthenticated = data.isLoggedIn

    // const params = new URL()
    // console.log(params)





  return (
      <>
      {
         isAuthenticated ? <Outlet/> : <Navigate to={"/auth"} />
      }
      </>
  )
}

export default PrivateRouter
