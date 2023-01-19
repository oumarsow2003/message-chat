import React, { useEffect, useState} from 'react'
import FriendList from './FriendList';
import Chat from './Chat';
import Search from './Search';
import NoCurrentReceiver from '../NoCurrentReceiver';

const Main = () => {
    const [user,setUser] = useState({})
    const receiver = localStorage.getItem("currentReceiver")
    useEffect(()=>{
        const current = JSON.parse(window.localStorage.getItem("currentUser"))
        setUser(current)
    },[])
  return (
    <div className='flex bg-gray-100  justify-between h-full'>
       <FriendList/>
        <Chat/>
        <Search/>
    </div>
  )
}

export default Main