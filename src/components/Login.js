import React from 'react'
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"
import { useNavigate } from 'react-router-dom';
import {useState} from "react"
import { Link } from 'react-router-dom';

const initalValues = {
    email:"",
    password:""
}

const Login = () => {
    const navigate = useNavigate()
    const [loginInfo,setLoginInfo] = useState(initalValues)
    const [error,setError]=useState(null)
    
    const handleChange=(e)=>{
        const new_values ={...loginInfo,[e.target.id]:e.target.value}
        setLoginInfo(new_values)
    }

    const handleSubmit = (e)=>{
        const email = loginInfo.email
        const password= loginInfo.password
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {
            const user = userCredential.user;
            window.localStorage.setItem("currentUser",JSON.stringify(user))
            navigate('/')
        })
        
        .catch((error) => {
            setError(error.message)
        });
        setLoginInfo(initalValues)
    }
    
  return (
    <div className='flex flex-row justify-center items-center  h-[80vh]'>
        <form onSubmit={handleSubmit} className="w-full max-w-lg m-auto py-10 mt-10 px-10 border rounded-xl">
            <h2 className='text-3xl '>Connexion</h2>
            <div className='flex flex-col mt-6'>
            {error && <p className='text-red-500'>{error}</p>}
                <label htmlFor='email'>Email:</label>
                <input onChange={handleChange} value={loginInfo["email"]} type="text" className='border h-10 rounded mt-2' id="email"/>
                <label htmlFor='password'>Mot de passe :</label>
                <input onChange={handleChange} value={loginInfo["password"]} type="text" className='border h-10 rounded mt-2'id="password"/>
            </div>
            <button
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"
                type="submit"
            >
                Se connecter
            </button>
            <Link to="signin" className='float-right text-blue-400 mt-2 underline'>S'inscrire</Link>
        </form>
    </div>
  )
}

export default Login