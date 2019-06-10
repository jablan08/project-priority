import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    padding: 0 0 30px;
    flex: 1;
`
const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .sub-log-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1 1 auto;
        max-width: 420px;
        margin: 0 0 100px;
        border-radius: 5px;
        box-sizing: border-box;
    }
    .login-box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .input-box {
        display: flex;
        flex-direction: column;
        padding: 8px 12px;
        background: #fff;
        border: 1px solid #ddd;
        cursor: text;
        box-sizing: border-box;
        border-radius: 5px;
        margin: 1rem 0 2rem 0;
    }
    .sign-box {
        text-align: center;
        margin: 0 0 30px;
        font-size: 24px;
        line-height: 36px;
        letter-spacing: .03em;
        }
`

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
            <>
                <LoginContainer>
                    <MainBox>
                        <div className="sub-log-box">
                            <div>
                                <h1 className="sign-box">
                                    Sign in
                                </h1>
                            </div>
                            <div className="login-box">
                                {     
                                    this.props.currentUser.name 
                                    ? this.props.currentUser.company
                                        ? <Redirect to={`/clients/${this.props.currentUser._id}`}/>
                                        : <Redirect to={`/product/${this.props.currentUser._id}`}/>
                                    : <form onSubmit={e => this.handleSubmit(e)}>
                                        <label htmlFor="email">Email</label>
                                        <input className="input-box" type="text" name="email" onChange={this.handleChange} value={email}/>
                                        <label htmlFor="password">Password</label>
                                        <input className="input-box" type="password" name="password" onChange={this.handleChange} value={password}/>
                                        <button type="submit"> Submit</button>
                                        {message}
                                    </form>
                                }
                            </div>
                        </div>
                    </MainBox>
                </LoginContainer>
            </>
         );
    }
}
 
export default Login;