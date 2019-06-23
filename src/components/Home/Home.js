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

    @media (max-width: 50rem) {
        .mid-container, .mid-container-2 {
            flex-direction: column;
            align-items: center;
        }
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
                <span className="title">Monitor feedback to prioritize what clients want and what features to build </span>
                <span className="subtitle"> Organize product decisions based off of client feed back and feature requests.</span>
                </div>
                <div className="right-side">
                    <img className="right-side-img" src="/imgs/thoughts.png" alt="thinking gif"/>
                </div>
            </header>
        </HomeTop>
        <HomeMid>
            <div className="mid-container">
                <div className="text-content">
                    <h2 className="title">
                        Instantly communicate with clients managing expectations.
                    </h2>
                    <p className="subtitle">
                        Keep everyone up to date with product decisions and what feature request are being prioritized.
                    </p>
                    <ul>
                        <li>
                            Communicate why a feature won't be built or explain why a explain is being prioritized.
                        </li>
                        <li>
                            Prioritized features can be seen by everyone, encourage clients to collaborate!
                        </li>
                    </ul>
                </div>
                <div className="img-side">
                    <img className="img-tag" src="/imgs/PPcomments.png" alt="feature request"></img>
                </div>

            </div>
            <div className="mid-container-2">
                <div className="text-content">
                    <h2 className="title">
                        Feature request voting board
                    </h2>
                    <p className="subtitle">
                        When a feature request is created, clients can vote on what features they want the most. Prioritize the features wanted the most allowing clients to see that their feedback is taken seriously.
                    </p>
                    <ul>
                        <li>
                            Comments can be made on all request. If clarification is needed, easily reach out to clients or teammates.
                        </li>
                        <li>
                            Reach out to everyone with the same request and enable discussion.
                        </li>
                    </ul>
                </div>
                <div className="img-side">
                    <img className="img-tag" src="/imgs/PPvotingonly.png" alt="Vote example"></img>
                </div>

            </div>

        </HomeMid>
    </HomeContainer>



export default Home;