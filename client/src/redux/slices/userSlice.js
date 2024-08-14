import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn : false,
    userInfo : {}
}
const userSlice = createSlice({
     name : "user",
     initialState,
     reducers : {
         loginSuccess : (state , action) => {
          
              state.isLoggedIn = true
              state.userInfo = action.payload

              return state
            
         },
         registerSuccess : (state , action) => {
          
              state.isLoggedIn = true
              state.userInfo = action.payload

              return state
            
         },
         logoutSuccess : (state , action) =>{
            
                state.isLoggedIn = false,
                state.userInfo = {}

                return state

         }
     }
})


export const { loginSuccess, registerSuccess, logoutSuccess } = userSlice.actions
export default userSlice.reducer