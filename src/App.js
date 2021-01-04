import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAXBaeOfLu683mFgsX8i8MflYZFdmOe2mE",
  authDomain: "chat-app-5500c.firebaseapp.com",
  projectId: "chat-app-5500c",
  storageBucket: "chat-app-5500c.appspot.com",
  messagingSenderId: "387928386290",
  appId: "1:387928386290:web:a16ece984cd211ae617e6b",
  measurementId: "G-478KS12S03"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Chat App</h1>
        <SignOut />
      </header>
      <section>
        <div className="side">
          <SideBar />
        </div>
        <div className="area">
          {user ? <ChatRoom /> : <SignIn />}
        </div>
      </section>
    </div>
  );
}

function SideBar() {
  const dummy = useRef();
  const channelsRef = firestore.collection('channels');
  const query = channelsRef.orderBy('createdAt').limit(25);

  const [channels] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendChannel = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await channelsRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <h3>
      Channels
    </h3>

    <form className="channelForm" onSubmit={sendChannel}>

      <input className="channelInput" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type Channel" />

      <button className="channelButton" type="submit" disabled={!formValue}>Send</button>

    </form>

    <main className="channelMain">

      {channels && channels.map(chnl => <Channel key={chnl.id} channel={chnl} />)}

      <span ref={dummy}></span>

    </main>
  </>)
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {

  const dummy = useRef();
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
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main className="messageMain">

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form className="messageForm" onSubmit={sendMessage}>

      <input className="messageInput" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type Message" />

      <button className="messageButton" type="submit" disabled={!formValue}>Send</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="icon"/>
      <p>{text}</p>
    </div>
  </>)
}

function Channel(props) {
  const { text, uid } = props.channel;

  const channelClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`channel ${channelClass}`}>
      <p># {text}</p>
    </div>
  </>)
}

export default App;
