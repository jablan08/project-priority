import React from 'react';
import styled from "styled-components";


const HomeContainer = styled.div`
    display:flex;
    flex-direction: column;

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
            font-size: 1.5rem;
        }
        
    }

    .right-side-img {
        width: 400px;
        max-width: 90%;
        padding: 0 50px;
    }

`
const HomeMid = styled.section`

    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    

    .mid-container {
        display: flex;
        margin: 70px 0;
        flex-direction: row-reverse;
        max-width: 960px;
        width: 100%;
        justify-content: space-between;

    }
    .text-content {
        max-width: 45%;
        margin: 0 0 30px;
        > ul {
        /* list-style: none; */
            > li {
                list-style-type: disc;
                margin: 0 0 .5rem 3.5rem;
                font-size: 1.5rem;
                line-height: 3rem;
            }
        }
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
            font-size: 1.5rem;
        }
    }
    .img-tag {
            width: 45rem;
            max-width: 100%;
            align-self: flex-start;
    }
    .mid-container-2 {
        display: flex;
        margin: 70px 0;
        /* flex-direction: row-reverse; */
        max-width: 960px;
        width: 100%;
        justify-content: space-between;

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
                    <img className="right-side-img" src="/imgs/temp_pp.gif" alt="thinking gif"/>
                </div>
            </header>
        </HomeTop>
        <HomeMid>
            <div className="mid-container">
                <div className="text-content">
                    <h2 className="title">
                        Manage expectations across the board.
                    </h2>
                    <p className="subtitle">
                         Not every feature should be built. Communicate to customers and teammates which features have been prioritized.
                    </p>
                    <ul>
                        <li>
                            Provide explanations for product decisions.
                        </li>
                        <li>
                            Encourage collaboration on prioritized features.
                        </li>
                    </ul>
                </div>
                <div className="img-side">
                    <img className="img-tag" src="/imgs/feature-manage-pp.png" alt="feature request"></img>
                </div>

            </div>
            <div className="mid-container-2">
                <div className="text-content">
                    <h2 className="title">
                        Feature voting board
                    </h2>
                    <p className="subtitle">
                        Instead of sending users to an email form, let them vote on features. They'll love your transparency and commitment to building a great product.
                    </p>
                    <ul>
                        <li>
                            Automatically group similar requests.
    
                        </li>
                        <li>
                            Reach out to everyone with the same request and enable discussion.
                        </li>
                    </ul>
                </div>
                <div className="img-side">
                    <img className="img-tag" src="/imgs/vote-placeholder.png" alt="Vote example"></img>
                </div>

            </div>

        </HomeMid>
    </HomeContainer>



export default Home;