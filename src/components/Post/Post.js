import React, { Component } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const Postbox = styled.div`
    display:flex;
    flex-direction: column;
`
const PostForm = styled.div`
    display:flex;
    flex-direction: column;
    .button-submit {
        border: none;
        background-color: white;
        cursor: pointer;
        font-size: 1.5rem;
    }
    .button-submit:hover {
        color: rgb(65,105,225);
    }
    > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem 0 1rem;
    }
    .input-box {
        display: flex;
        flex-direction: column;
        padding: 8px 110px;
        background: #fff;
        border: 1px solid #ddd;
        cursor: text;
        box-sizing: border-box;
        border-radius: 5px;
        margin: 1rem 0 2rem 0;
    }
    .label-tag {
        font-size: 1.4rem;
    }
`

class Post extends Component {
    state = { 
        title: "",
        text: ""
    }
    handleChange = (e) =>
    this.setState({
        [e.target.name]: e.target.value
    })

handleSubmit = async (e) => {
    e.preventDefault();
    const { title, text } = this.state
    const obj = {
        title,
        text,
        currentUser: this.props.currentUser 
    }
    try {
        const post = await fetch("/posts/new", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await post.json();
        console.log(parsedResponse, "response of post")
        console.log(parsedResponse.newPost, "response of post")
        if (parsedResponse.success) {
            console.log("worked")
            this.props.handleNewPost(parsedResponse.findPost)
        }
    } catch (error) {
        console.log(error)
    }
}

    render() { 
        const { title, text } = this.state
        return ( 
            <Postbox>
                <PostForm>
                    <form onSubmit={this.handleSubmit}>
                        <label className="label-tag" htmlFor="title">Feature request</label>
                        <input className="input-box" text="text" name="title" onChange={this.handleChange} value={title}/>
                        <label className="label-tag" htmlFor="text">What's your suggestion?</label>
                        <textarea className="input-box" text="text" name="text" maxLength="500" rows="6" cols="50" onChange={this.handleChange} value={text}></textarea>
                        <button className="button-submit"> Submit Post <FontAwesomeIcon icon={faCheckSquare}/> </button>
                    </form>

                </PostForm>
            </Postbox>
         );
    }
}
 
export default Post;