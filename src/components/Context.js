import React, { createContext,useState,useEffect } from 'react';
import {auth} from "../firebase"
import { onAuthStateChanged } from 'firebase/auth';
export const UserContext =createContext();
export const UserContextProvider = ({children})=>{
  const [user,setUser] = useState({})
  useEffect(()=>{
    onAuthStateChanged(auth,(user) => {
            setUser(user)
             
        });
  },[])
    return(
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}