import React from 'react'
import { auth } from '../firebase';
const style = {
    sent:"bg-[#395dff] text-white flex-row-reverse float-right rounded-bl-full",
    received:"bg-[#e5e5ea] text-black float-left rounded-br-full",
    message:"flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full "
}
const Message = ({message}) => {
const messageClass =  message.uid == auth.currentUser.uid ? `${style.sent}` : `${style.received}`
return (
    <div className='relative'>
        <div className={`${style.message} ${messageClass}`}>
            <p className='absolute mt-[-4rem] text-gray-600 text-xs'>{message.name}</p>
            <p className=''>{message.text}</p>
        </div>
    </div>
  )
}

export default Message