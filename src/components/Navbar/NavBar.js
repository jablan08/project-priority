
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import * as routes from "../../constants/routes"
import "./NavBar.css"
import styled from "styled-components";

const StyledNav = styled.div`
    display:flex;
    max-width: 96rem;
    justify-content: space-between;
    flex-direction: row;
    width:100%;
    margin: 0 auto;
    padding: 2rem 0;


`

const LandingDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    z-index: 100;

`
const Div = styled.div`
    justify-content: flex-end;
    @media (max-width: 50rem) {
        display:none
    }
`
const Moblie = styled.div`
    display: none;
    /* @media (max-width: 500rem) {
        display: none;
    } */
    @media (max-width: 50rem) {
        flex-direction: column;
        display: flex;
    }
    .btn {
    background-color: rgb(65,105,225); 
    border: none; 
    color: white;
    font-size: 3.5rem; 
    cursor: pointer; 
    }
    .btn:hover {
    background-color: Red;
    }
    .x-btn {
        font-size: 2rem;
        margin-left: .5rem;

    }
    .x-btn:hover {
        color: Red;
    }
`
const Nav = styled(NavLink)`
    font-size: ${props => props.primary ? "1.4rem" : "2rem"};
    color: rgb(169,169,169);   
    margin: 0.5rem; 
    :hover {
        color: rgb(30,144,255);
    }
    text-decoration: none;
    
`
// const Awesome = styled(FontAwesomeIcon)`
//     .btn {
//     background-color: DodgerBlue; /* Blue background */
//     border: none; /* Remove borders */
//     color: white; /* White text */
//     padding: 12px 16px; /* Some padding */
//     font-size: 1.6rem; /* Set a font size */
//     cursor: pointer; /* Mouse pointer on hover */
//     }
//     .btn:hover {
//     background-color: Red;
//     }
// `
const Button = styled.button`
    background:none;
    color:inherit;
    border:none; 
    font: inherit;
    /*border is optional*/
    cursor: pointer;
    color: rgb(169,169,169);     
    
    :hover {
        color: rgb(30,144,255);
    }
    font-size: ${props => props.primary ? "1.4rem" : "2rem"};
`
const Title = styled.h1`
    color: rgb(65,105,225);
    font-size: 3rem;
    
`
class NavBar extends Component {
    state = { 
        navModal: false
    }

    handleNav = () =>
        this.setState({
            navModal: true
        })
    handleNavClose = () =>
        this.setState({
            navModal: false
        })
    render() { 
        const { currentUser, doLogout } = this.props 
        const { navModal } = this.state
        return ( 
            <StyledNav>
                <Title className="title">Project Priority</Title>
                    <LandingDiv>
        
                        <Div>
                            <NavContent currentUser={currentUser} doLogout={doLogout}/>
                        </Div>
                        <Moblie>
                            
                                {
                                    navModal
                                    ? <FontAwesomeIcon icon={faTimes} className="x-btn"onClick={()=>this.handleNavClose()} />
                                    : <FontAwesomeIcon icon={faBars}  className="btn" onClick={()=>this.handleNav()}/>
                                }
                            {
                                navModal
                                && <NavContentMoblie currentUser={currentUser} doLogout={doLogout}/> 
                            }
                        </Moblie>
                    </LandingDiv>
        
            </StyledNav>
         );
    }
}
 

    

const NavContent = ({currentUser, doLogout}) => 
    <>
        {
            currentUser.name
            ? currentUser.company
                ? <Nav to={`${routes.CLIENT}/home/${currentUser._id}`}> Home </Nav>
                : <Nav to={`${routes.PRODUCT}/home/${currentUser._id}`}> Home </Nav>
            : <Nav exact to={routes.ROOT} activeClassName="active">Home</Nav>
        }
        {/* <Nav exact to={routes.POST} activeClassName="active">POST</Nav> */}
        {
            currentUser.name
            ? <span className="message"> 
            {
                currentUser.company
                ? <Nav to={`${routes.CLIENT}/${currentUser._id}`}> Account </Nav>
                : <Nav to={`${routes.PRODUCT}/${currentUser._id}`}> Account </Nav>
            }
            <Button onClick={doLogout} className="navButton" >Logout</Button>
            </span>
            : [<Nav key={2} to={routes.REGISTER} activeClassName="active">Register </Nav>,
            <Nav key={1} to={routes.LOGIN} activeClassName="active">Log in </Nav> ]   
        }
    </>
const NavContentMoblie = ({currentUser, doLogout}) => 
    <>
        {
            currentUser.name
            ? currentUser.company
                ? <Nav primary="true" to={`${routes.CLIENT}/home/${currentUser._id}`}> Home </Nav>
                : <Nav primary="true" to={`${routes.PRODUCT}/home/${currentUser._id}`}> Home </Nav>
            : <Nav primary="true" exact to={routes.ROOT} activeClassName="active">Home</Nav>
        }
        {/* <Nav primary="true" exact to={routes.POST} activeClassName="active">POST</Nav> */}
        {
            currentUser.name
            ? <span className="message"> 
            {
                currentUser.company
                ? <Nav primary="true" to={`${routes.CLIENT}/${currentUser._id}`}> Account </Nav>
                : <Nav primary="true" to={`${routes.PRODUCT}/${currentUser._id}`}> Account </Nav>
            }
            <Button onClick={doLogout} className="navButton" >Logout</Button>
            </span>
            : [<Nav primary="true" key={2} to={routes.REGISTER} activeClassName="active">Register </Nav>,
            <Nav primary="true" key={1} to={routes.LOGIN} activeClassName="active">Log in </Nav> ]   
        }
    </>
export default NavBar;