import React from 'react';
import { NavLink } from "react-router-dom";

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
    padding: 2rem;


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
        font-size:10rem;
        display: flex;
    }
`
const Nav = styled(NavLink)`
    font-size: 2.5rem;
    color: rgb(169,169,169);   
    margin: 0.5rem; 
    :hover {
        color: rgb(30,144,255);
    }
    text-decoration: none;

`
const Button = styled.button`

    background:none;
    color:inherit;
    border:none; 
    font: inherit;
    /*border is optional*/
    cursor: pointer;
    color: rgb(212,175,55);    
    text-decoration: underline;
    :hover {
        color: #F5F5F5
    }
`
const Title = styled.h1`
    color: rgb(65,105,225);
    font-size: 3rem;
    
`

const NavBar = ({currentUser, doLogout}) =>
    
    <StyledNav>
        <Title className="title">Project Priority</Title>
            <LandingDiv>

                <Div>
                    <NavContent currentUser={currentUser} doLogout={doLogout}/>
                </Div>
                <Moblie>
                    hello
                    {/* <NavContent currentUser={currentUser} doLogout={doLogout}/> */}
                </Moblie>
            </LandingDiv>

    </StyledNav>

const NavContent = ({currentUser, doLogout}) => 
    <>
        {
            currentUser.name
            ? currentUser.company
                ? <Nav to={`${routes.CLIENT}/home/${currentUser._id}`}> HOME </Nav>
                : <Nav to={`${routes.PRODUCT}/home/${currentUser._id}`}> HOME </Nav>
            : <Nav exact to={routes.ROOT} activeClassName="active">HOME</Nav>
        }
        <Nav exact to={routes.POST} activeClassName="active">POST</Nav>
        {
            currentUser.name
            ? <span className="message"> 
            {
                currentUser.company
                ? <Nav to={`${routes.CLIENT}/${currentUser._id}`}> ACCOUNT </Nav>
                : <Nav to={`${routes.PRODUCT}/${currentUser._id}`}> ACCOUNT </Nav>
            }
            <Button onClick={doLogout} className="navButton" >LOGOUT</Button>
            </span>
            : [<Nav key={1} to={routes.LOGIN} activeClassName="active">LOGIN </Nav>,
            <Nav key={2} to={routes.REGISTER} activeClassName="active">REGISTER </Nav> ]   
        }
    </>
export default NavBar;