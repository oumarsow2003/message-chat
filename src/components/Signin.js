import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import {createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { ref , uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import {auth,storage} from "../firebase"
import { useNavigate } from 'react-router-dom';
import { addDoc , collection } from 'firebase/firestore';
import { db } from '../firebase';
const initalValues = {
    pseudo:"",
    email:"",
    password:""
}
const Signin = () => {
    const navigate = useNavigate()
    const [signinInfo,setSigninInfo] = useState(initalValues)
    const [error,setError]=useState(null)
    const handleChange=(e)=>{
        const new_values ={...signinInfo,[e.target.id]:e.target.value}
        setSigninInfo(new_values)
    }
    const handleSubmit=(e)=>{
        const email = signinInfo.email
        const password= signinInfo.password
        const file = e.target[3].files[0]
        console.log(file);
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
                const storageRef = ref(storage, signinInfo.pseudo);

                const uploadTask = uploadBytesResumable(storageRef, file);

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        updateProfile(userCredential.user, {
                            displayName: signinInfo.pseudo , 
                            photoURL : downloadURL
                        }).then(()=>{
                            const insert = async()=>{
                                try {
                                     await addDoc(collection(db, "users"), {
                                      name:signinInfo.pseudo,
                                      uid:auth.currentUser.uid,
                                      photoUrl : downloadURL
                                    });
                                  } catch (e) {
                                    console.error("Error adding document: ", e);
                                  }
                            }
                            insert()
                            window.localStorage.setItem("currentUser",JSON.stringify(userCredential.user))
                            navigate("/")}
                            )
                    });
                }
                );
            
        })
        .catch((error) => {
            setError(error.message);
        });
        setSigninInfo(initalValues)
    }
  return (
    <div className='flex flex-row justify-center items-center  h-[80vh]'>
        <form onSubmit={handleSubmit} className="w-full max-w-lg m-auto py-10 mt-10 px-10 border rounded-xl">
            <h2 className='text-3xl '>Inscription</h2>
            <div className='flex flex-col mt-6'>
            {error && <p className='text-red-500'>{error}</p>}
            <label htmlFor='pseudo'>Pseudo:</label>
                <input onChange={handleChange} value={signinInfo["pseudo"]} type="text" className='border h-10 rounded mt-2' id="pseudo"/>
                <label htmlFor='email'>Email:</label>
                <input onChange={handleChange} value={signinInfo["email"]} type="text" className='border h-10 rounded mt-2' id="email"/>
                <label htmlFor='password'>Mot de passe :</label>
                <input onChange={handleChange} value={signinInfo["password"]} type="text" className='border h-10 rounded mt-2'id="password"/>
                <input type="file"/>
            </div>
            <button
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"
                type="submit"
            >
                S'inscrire
            </button>
            <Link to="/" className='float-right text-blue-400 mt-2 underline'>Se connecter</Link>
        </form>
    </div>
  )
}

export default Signin