import React, { useState, useEffect } from 'react'
import { query , collection,where , or ,onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import {signOut} from 'firebase/auth';
import {auth} from "../firebase"
import { useNavigate } from 'react-router-dom';
const FriendList = () => {
  const navigate = useNavigate()
  const currentUser= JSON.parse(window.localStorage.getItem("currentUser"))
  const logout = ()=>{
    signOut(auth).then(() => {
      localStorage.clear()
        navigate("/")
      })
}
  return (
    <div className='bg-white rounded w-96 flex flex-col  shadow-sm align-items-center justify-center'>
        <img className='w-48 rounded-full h-48 mb-3' src={currentUser?.photoURL} alt="" />
        <h2 className='text-center text-3xl mb-3'>{currentUser?.displayName}</h2>
        <p className='text-center text-blue-700  cursor-pointer' onClick={logout}>Déconnexion</p>
        
    </div>
  )
}

export default FriendList