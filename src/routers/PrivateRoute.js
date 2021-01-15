import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
   return props.authenticated ? (
      <Route exact path={props.path} component={props.component} />
   ) : (
      <Redirect to={{pathname: props.redirectTo, state: {from: props.location}}}></Redirect>
   )
}

export default PrivateRoute;