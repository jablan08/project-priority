import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import * as routes from "./constants/routes";
import NavBar from "./components/Navbar/NavBar";
import Login from "./components/Login/Login";
import './App.css';
import Register from "./components/Register/Register";

class App extends Component {
  state = {
    currentUser: null
  }

  setCurrentUser = (user) => {
    this.setState({
      currentUser: user
      
    })
  }
  doLogout= async () => {
    await fetch("/login/logout", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      }
    })
    this.setState({
      currentUser: null
    })
    this.props.history.push(routes.LOGIN)
  }
  render() { 
    const { currentUser } = this.state
    return ( 
      <>
        <NavBar doLogout={this.doLogout} currentUser={currentUser}/> 
        <Switch>
          <Route exact path={routes.ROOT} render={()=> <div>Hi</div> }/>
          
          <Route exact path={routes.REGISTER} render={() => <Register currentUser={currentUser} setCurrentUser={this.setCurrentUser}/>} />
          <Route exact path={routes.LOGIN} render={()=> <Login currentUser={currentUser} setCurrentUser={this.setCurrentUser}/>} />
          <Route render={()=> <div>You're LOST</div>}/>
        </Switch>
      </>
    );
  }
}
 
export default withRouter(App);