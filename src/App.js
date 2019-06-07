import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import * as routes from "./constants/routes";
import NavBar from "./components/Navbar/NavBar";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
import ProductHome from "./components/ProductHome/ProductHome"
import ClientHome from "./components/ClientHome/ClientHome"

import './App.css';
import Register from "./components/Register/Register";


class App extends Component {
  state = {
    currentUser: {}
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
      currentUser: {}
    })
    this.props.history.push(routes.ROOT)
  }
  render() { 
    const { currentUser } = this.state
    return ( 
      <>
        <NavBar doLogout={this.doLogout} currentUser={currentUser}/> 
        <Switch>
          <Route exact path={routes.ROOT} render={()=> <div>Hi</div> }/>
          <Route exact path={routes.POST} render={()=> <Post currentUser={currentUser}/>}/>
          <Route exact path={`${routes.PRODUCT}/home/:id`} render={()=> <ProductHome currentUser={currentUser} setCurrentUser={this.setCurrentUser} />}/>
          <Route exact path={`${routes.CLIENT}/home/:id`} render={()=> <ClientHome currentUser={currentUser} setCurrentUser={this.setCurrentUser} />}/>
          <Route exact path={`${routes.PRODUCT}/:id`} render={()=> <ProductHome currentUser={currentUser} setCurrentUser={this.setCurrentUser} />}/>
          <Route exact path={`${routes.CLIENT}/:id`} render={()=> <ClientHome currentUser={currentUser} setCurrentUser={this.setCurrentUser} />}/>
          <Route exact path={routes.REGISTER} render={() => <Register currentUser={currentUser} setCurrentUser={this.setCurrentUser}/>} />
          <Route exact path={routes.LOGIN} render={()=> <Login currentUser={currentUser} setCurrentUser={this.setCurrentUser}/>} />
          <Route render={()=> <div>You're LOST</div>}/>
        </Switch>
      </>
    );
  }
}

export default withRouter(App);