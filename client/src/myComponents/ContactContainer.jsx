import React from 'react'
import MessageOptions from './MessageOptions'
import UserInfo from './UserInfo'

function ContactContainer() {
  return (
    <div className='h-screen p-4 pt-10 pb-2 text-white border-r-2 border-gray-700 w-[22vw] flex items-center justify-between flex-col'>
        <div>

        <div className='flex items-center justify-start gap-3'>
       <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64" width="50px" height="50px"><linearGradient id="OyjJuqjL9TEg1SwLmZIp8a" x1="13.317" x2="13.317" y1="8.915" y2="51.952" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1a6dff"/><stop offset="1" stop-color="#c822ff"/></linearGradient><path fill="url(#OyjJuqjL9TEg1SwLmZIp8a)" d="M12,26.75h-2c0,3.841,1.949,7.317,5.489,9.79l1.145-1.639C13.646,32.813,12,29.918,12,26.75z"/><linearGradient id="OyjJuqjL9TEg1SwLmZIp8b" x1="32" x2="32" y1="8.915" y2="51.952" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1a6dff"/><stop offset="1" stop-color="#c822ff"/></linearGradient><path fill="url(#OyjJuqjL9TEg1SwLmZIp8b)" d="M53.07,47.771c3.186-2.608,4.93-6.113,4.93-9.938c0-7.085-6.196-12.935-14.148-13.732 C42.396,16.011,34.479,10,25.055,10C14.548,10,6,17.514,6,26.75c0,4.956,2.336,9.417,6.597,12.633l-2.035,6.311 c-0.129,0.401,0.008,0.841,0.342,1.099C11.082,46.93,11.298,47,11.514,47c0.187,0,0.374-0.052,0.539-0.158l6.701-4.288 c2.527,0.831,5.626,1.138,8.598,0.825c2.478,4.873,8.107,8.289,14.648,8.289c1.943,0,3.845-0.285,5.659-0.847l5.386,3.05 c0.154,0.087,0.324,0.13,0.493,0.13c0.22,0,0.439-0.072,0.619-0.215c0.319-0.252,0.454-0.672,0.342-1.063L53.07,47.771z M18.966,40.511c-0.293-0.107-0.619-0.07-0.882,0.097l-4.765,3.05l1.403-4.351c0.135-0.418-0.02-0.875-0.38-1.126 C10.253,35.322,8,31.263,8,26.75C8,18.617,15.65,12,25.055,12c8.28,0,15.257,5.09,16.751,12.009C33.073,24.1,26,30.262,26,37.833 c0,1.248,0.209,2.451,0.569,3.602C23.886,41.639,21.143,41.306,18.966,40.511z M51.323,46.6c-0.333,0.25-0.477,0.679-0.361,1.078 l0.936,3.244l-3.635-2.059c-0.152-0.086-0.322-0.13-0.493-0.13c-0.107,0-0.215,0.018-0.319,0.053 c-1.736,0.584-3.57,0.881-5.45,0.881c-7.72,0-14-5.309-14-11.834C28,31.309,34.28,26,42,26s14,5.309,14,11.833 C56,41.227,54.339,44.341,51.323,46.6z"/><linearGradient id="OyjJuqjL9TEg1SwLmZIp8c" x1="18" x2="18" y1="19.894" y2="23.383" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"/><stop offset="1" stop-color="#e6abff"/></linearGradient><circle cx="18" cy="22" r="2" fill="url(#OyjJuqjL9TEg1SwLmZIp8c)"/><g><linearGradient id="OyjJuqjL9TEg1SwLmZIp8d" x1="32" x2="32" y1="19.894" y2="23.383" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"/><stop offset="1" stop-color="#e6abff"/></linearGradient><circle cx="32" cy="22" r="2" fill="url(#OyjJuqjL9TEg1SwLmZIp8d)"/></g><g><linearGradient id="OyjJuqjL9TEg1SwLmZIp8e" x1="36.5" x2="36.5" y1="32.872" y2="35.468" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"/><stop offset="1" stop-color="#e6abff"/></linearGradient><circle cx="36.5" cy="34.5" r="1.5" fill="url(#OyjJuqjL9TEg1SwLmZIp8e)"/></g><g><linearGradient id="OyjJuqjL9TEg1SwLmZIp8f" x1="47.5" x2="47.5" y1="32.872" y2="35.468" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6dc7ff"/><stop offset="1" stop-color="#e6abff"/></linearGradient><circle cx="47.5" cy="34.5" r="1.5" fill="url(#OyjJuqjL9TEg1SwLmZIp8f)"/></g></svg>
        <h2 className=''> <span className='text-purple-600 font-bold italic'>SYNCHRONOUS</span> CHAT</h2>
        </div>

        <MessageOptions />
        </div>


        <UserInfo/>

       
    </div>
  )
}

export default ContactContainer
