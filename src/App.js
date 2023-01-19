import Navbar from "./components/Navbar";
import {auth} from "./firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
import { onAuthStateChanged } from 'firebase/auth';
import Chat from "./components/Chat";
import Login from "./components/Login";
import Signin from "./components/Signin";
import {Routes,Route} from "react-router-dom"
import Main from "./components/Main";
import { UserContextProvider,UserContext } from './components/Context';
import { useEffect, useState,useContext } from "react";
function App(){
  const {user} = useContext(UserContext)
  return(
          
          <Routes>
            <Route path="/" element={!user?<Login/>:<Main/>}/>
            <Route path="/signin" element={<Signin/>}/>
          </Routes>
    
  )
}
export default App;