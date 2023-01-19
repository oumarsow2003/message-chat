import React from 'react'
import {useState} from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from '../firebase';
import { db } from '../firebase'
const SendMessage = () => {
    const [message,setMessage] = useState("")
    const send =async(e)=>{
        e.preventDefault()
        const temp = message
        setMessage("")
        try {
             await addDoc(collection(db, "messages"), {
              text :temp,
              name:auth.currentUser.displayName,
              timestamp:serverTimestamp(),
              uid:auth.currentUser.uid,
              oid:JSON.parse(window.localStorage.getItem("currentReceiver")).uid
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
  return(
    <form className='position-absolute w-full bottom-2 px-4' onSubmit={(e)=>message? send(e) : e.preventDefault()}>
        <input className='border pl-3 w-11/12 h-10 rounded-tl-3xl rounded-bl-3xl' placeholder='Entrer un message...'value = {message} onChange={(e)=>setMessage(e.target.value)} type="text"/>
        <button type='submit' className='btn btn-blue-600 bg-blue-600 h-10 rounded-0 absolute right-12 hover:bg-blue-600   text-white '>Envoyer</button>
    </form>
  )
}

export default SendMessage