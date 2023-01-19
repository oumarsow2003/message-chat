import React from 'react'
import SendMessage from './SendMessage'
import { useEffect , useState } from 'react'
import { getDocs ,collection ,  where,and,query,or,onSnapshot,orderBy} from 'firebase/firestore'
import Message from './Message'
import { db } from '../firebase'
import { async } from '@firebase/util'
import { auth } from '../firebase'
const Chat = () => {
  const [messages,setMessages] = useState([])
  const receivers = localStorage.getItem("currentReceiver")
  const [filteredMessagesList ,setfilteredMessagesList] = useState([])
    const currentReceiver = JSON.parse(window.localStorage.getItem("currentReceiver"))
    const currentUser= JSON.parse(window.localStorage.getItem("currentUser"))
    const [receiver , setreceiver] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'messages'),orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  useEffect(()=>{
    const filtered  = messages.filter(message=>(((message.uid === currentUser.uid) && (message.oid === currentReceiver?.uid)) || ((message.uid === currentReceiver?.uid) && (message.oid === currentUser.uid)) ))
    setfilteredMessagesList(filtered)
  })
  
    const msg_list = auth.currentUser && filteredMessagesList?.map(message=>(
      <li key={message.id}><Message message = {message}/></li>
    ))
  return (

    <div className='bg-white relative w-[55%] h-[100vh] rounded relative'>
      {receivers?
      <div>
        <div className='flex pl-5 pb-3 pt-2 border-bottom shadow-sm'>
        <img className='w-10 rounded-full h-10' src={currentReceiver.photoUrl}/>
          <h2 className='text-2xl ml-1'>{currentReceiver.name}</h2>
        </div>
        <ul className='flex flex-col mt-3  absolute inset-0 top-12 overflow-y-scroll '>
          {msg_list}
        </ul>
        <SendMessage/>
      </div> : <h2 className='flex h-[100vh] align-items-center justify-center  text-3xl'>Choisissez une conversation</h2>
      }
      
    </div>
  )
}

export default Chat