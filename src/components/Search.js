import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection,query,onSnapshot, Timestamp, serverTimestamp } from 'firebase/firestore'
const Search = () => {
    const [users,setUsers] = useState()
    const [foundUsers,setFoundUsers] = useState([])
    const currentUser= JSON.parse(localStorage.getItem("currentUser"))
    const searchUser=(username)=>{
        const new_found = users?.filter(user=>user.name.toLowerCase().includes(username.toLowerCase()))
        const set=()=>username ?setFoundUsers(new_found) : setFoundUsers(users)
        set()
    }
    useEffect(() => {
        const q = query(collection(db, 'users'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let users = [];
          querySnapshot.forEach((doc) => {
            users.push({ ...doc.data()});
          });
          setUsers(users);
        });
        return () => unsubscribe();
      }, []);
    const userFoundedList = foundUsers?.filter(user=>user.name!=currentUser.displayName).map(user=>(
        <li key={user.uid} 
            onClick = {()=>{window.localStorage.setItem("currentReceiver",JSON.stringify(user))}}
            className=" flex   pr-2 mt-2  h-10 pl-2 pt-2 bg-gray-10">
              <img className='mr-2 object-cover rounded-full  w-8 h-8' src={user.photoUrl} alt=""/>
                {user.name}

        </li>
    ))
    const userList = users?.filter(user=>user.name!=currentUser.displayName).map(user=>(
        <li key={user.uid} 
            onClick = {()=>{window.localStorage.setItem("currentReceiver",JSON.stringify(user))}}
            className=" flex    pr-2 mt-2  h-10 pl-2 pt-2 bg-gray-10">
              <img className='mr-2 object-cover rounded-full  w-8 h-8' src={user.photoUrl} alt=""/>
                {user.name}

        </li>
    ))
    return (
    <div className='w-96  bg-gray-100 rounded p-1 shadow-sm'>
        <input onChange={(e)=>searchUser(e.target.value)} type = "text" className='border rounded-md pl-2 h-10 w-100 bg-gray-100' placeholder='Entrer un utilisateur'/>
        <h3 className='text-center text-lg mt-3'>Utilisateurs</h3>
        <ul className='list'>
            {foundUsers.length>0? userFoundedList : userList }

        </ul>
    </div>
  )
}

export default Search
