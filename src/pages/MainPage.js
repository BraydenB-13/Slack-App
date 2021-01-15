import React from "react";
import {Link} from "react-router-dom";
import "../App.css";
import Header from './components/header'
import SignOut from './components/signOut'
import SideBar from './components/sideBar'
import ChatRoom from './components/chatRoom'

const MainPage = (props) => {
	return (
		<div className="App">
      <header>
        <Header />
        <SignOut />
      </header>
      <section>
        <div className="side">
          <SideBar />
        </div>
        <div className="area">
          <ChatRoom />
        </div>
      </section>
    </div>
	);
};

export default MainPage;