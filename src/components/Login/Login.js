import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


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
            console.log(parsedResponse)
            if (parsedResponse.success) {
                localStorage.setItem("user", JSON.stringify(parsedResponse.user));
                this.setState({
                    email: "",
                    password: ""
                })
                this.props.setCurrentUser(parsedResponse.user)
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
                    this.props.currentUser.name 
                    ? this.props.currentUser.company
                        ? <Redirect to={`/clients/${this.props.currentUser._id}`}/>
                        : <Redirect to={`/product/${this.props.currentUser._id}`}/>
                    : <form onSubmit={e => this.handleSubmit(e)}>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" onChange={this.handleChange} value={email}/>
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