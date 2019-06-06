import React, { Component } from 'react';
import {Redirect} from "react-router-dom";


class Login extends Component {
    state = { 
        email: "",
        password: "",
        message: ""

    }
    handleChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value
    })

    handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const login = await fetch("/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await login.json();
            if (parsedResponse.success) {
                this.props.setCurrentUser(parsedResponse.user)
                this.setState({
                    email: "",
                    password: ""
                })
            } else {
                this.setState({
                    message: parsedResponse.message
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() { 
        const { email, password, message } = this.state
        return ( 
            <div>
                <div>
                    <h1>
                        Sign in
                    </h1>
                </div>
                {     
                    this.props.currentUser 
                    // <Redirect to={`/users/${this.props.currentUser._id}`}/>
                    ? <div> worked </div>
                    : <form onSubmit={e => this.handleSubmit(e)}>
                        <label htmlFor="email">Email</label>
                        <input text="text" name="email" onChange={this.handleChange} value={email}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={this.handleChange} value={password}/>
                        <button type="submit"> Submit</button>
                        {message}
                    </form>
                }
            </div>
         );
    }
}
 
export default Login;