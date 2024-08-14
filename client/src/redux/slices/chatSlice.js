import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     chatType : undefined,
     chatData : undefined,
     chatMessageData : [],

}
const chatSlice = createSlice({
     name : "chat",
     initialState,
     reducers : {
         selectChat : (state , action) =>{
            //  state.chatType = action.payload.chatType
            //  state.chatData = action.payload.chatData
            state = {...state , chatData : action.payload.chatData , chatType : action.payload.chatType}
             console.log(state)
             return state;
         },
         closeChat : (state , action) =>{
             state.chatType = undefined
             state.chatData = undefined
             state.chatMessageData = []
             
             return state;
         },
         addMessage : (state , action) =>{
            
              const chatMessageData = state.chatMessageData;
              const chatType = state.chatType;

              console.log(action.payload)
              

              state =  {...state , chatMessageData : [...chatMessageData , {message : action.payload.messageContent , receiver : chatType === "channel" ? action.payload.message.receiver : action.payload.receiver?._id,
                sender : chatType === "channel" ? action.payload.sender :action.payload.sender?._id,
                createdAt : action.payload.createdAt
               }]}

                console.log(state)

              return state;


         }
     }

})

export const {selectChat , closeChat , addMessage} = chatSlice.actions
export default chatSlice.reducer