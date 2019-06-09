import React from 'react';
import styled from "styled-components";


const HomeContainer = styled.div`
    display:flex;
`
const HomeTop = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-y: hidden;
    background: #fff;
    padding: 60px 0 90px;
    border-bottom: 1px solid #efefef;
    > header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        max-width: 960px;
        width: 100%;
        box-sizing: border-box;
        @media (max-width: 50rem) {
            flex-direction: column;
        }

    }
    .left-side {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 33%;
        
    }
    
    
    .title {
        color: #333;
        max-width: 30rem;
        font-size: 2.6rem;
        line-height: 34px;
        letter-spacing: .03em;
        font-weight: 700;
        @media (max-width: 50rem) {
            margin: 0 0 1rem;
            text-align: center;
            align-items: center;
            box-sizing: border-box;
            font-size: 2.5rem;
        }
    }
    .subtitle {
        margin: 1.5rem 0 0;
        max-width: 30rem;
        color: #666;
        font-size: 1.7rem;
        line-height: 2.4rem;
        @media (max-width: 50rem) {
            margin: 0 0 1rem;
            text-align: center;
            align-items: center;
            box-sizing: border-box;
            font-size: 2rem;
        }
        
    }

    .right-side-img {
        width: 400px;
        max-width: 90%;
        padding: 0 50px;
    }
`
const Home = () => 
    <HomeContainer>
        <HomeTop>
            <header>
                <div className="left-side">
                <span className="title">Track feedback to build better products.</span>
                <span className="subtitle">Capture feedback in one organized place to inform your product decisions.</span>
                </div>
                <div className="right-side">
                    <img className="right-side-img" src="/imgs/temp_pp.gif"/>
                </div>
                
            </header>
        </HomeTop>
    </HomeContainer>



export default Home;