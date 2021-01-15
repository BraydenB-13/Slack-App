import React from "react";
import { Link } from "react-router-dom";
import Header from './components/header'
import Side from './components/side'
import SignIn from "../components/signIn";

export default class LoginPage extends React.Component {

   render() {
      return (
        <div className="App">
        <header>
          <Header />
        </header>
        <section>
          <div className="side">
            <Side />
          </div>
          <div className="area">
            <SignIn />
          </div>
        </section>
      </div>
      );
   }
}