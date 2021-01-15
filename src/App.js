import React from 'react';
import './App.css';

import Header from './components/header'
import SideBar from './components/sideBar'
import SignIn from './components/signIn'
import SignOut from './components/signOut'
import ChatRoom from './components/chatRoom'
import Side from './components/side'

import { auth } from './server/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <Header />
        <SignOut />
      </header>
      <section>
        <div className="side">
          {user ? <SideBar /> : <Side />}
        </div>
        <div className="area">
          {user ? <ChatRoom /> : <SignIn />}
        </div>
      </section>
    </div>
  );
}

export default App;