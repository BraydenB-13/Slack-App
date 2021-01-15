import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth } from '../server/firebase'
import { firestore } from '../server/firebase'
import { ChatMessage } from '../components/chatMessage'

export default function ChatRoom() {

    const user = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue('');
      user.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <main className="messageMain">
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
        <span ref={user}></span>
  
      </main>
  
      <form className="messageForm" onSubmit={sendMessage}>
  
        <input className="messageInput" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type Message" />
  
        <button className="messageButton" type="submit" disabled={!formValue}>Send</button>
  
      </form>
    </>)
  }
