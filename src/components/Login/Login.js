import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt }from '@fortawesome/free-solid-svg-icons';

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
    .button-submit {
        border: none;
        float: right;
        background-color: white;
        cursor: pointer;
    }
    .button-submit:hover {
        color: rgb(65,105,225);
    }
    .label-tag {
        font-size: 1.4rem;
    }
`

class Login extends Component {
    state = { 
        email: "",
        password: "",
        message: "",
        error: ""

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
            this.setState({
                error: "There was an error in processing this action."
            })
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
                                        ? <Redirect to={`/clients/home/${this.props.currentUser._id}`}/>
                                        : <Redirect to={`/product/home/${this.props.currentUser._id}`}/>
                                    : <form onSubmit={e => this.handleSubmit(e)}>
                                        <label className="label-tag" htmlFor="email">Email</label>
                                        <input className="input-box" type="text" name="email" onChange={this.handleChange} value={email}/>
                                        <label className="label-tag" htmlFor="password">Password</label>
                                        <input className="input-box" type="password" name="password" onChange={this.handleChange} value={password} autoComplete="off"/>
                                        <button type="submit" className="button-submit"> Submit <FontAwesomeIcon size="lg" icon={faSignInAlt}/></button> <br/>
                                        <h6>{message} </h6> <br/>
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