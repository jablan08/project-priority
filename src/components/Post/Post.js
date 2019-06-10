import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import * as routes from "../../constants/routes"

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
        console.log(parsedResponse.newPost, "response of post")
        if (parsedResponse.success) {
            console.log("worked")
            this.props.handleNewPost(parsedResponse.newPost)
        }
    } catch (error) {
        console.log(error)
    }
}

    render() { 
        const { title, text } = this.state
        return ( 
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="title">Feature request</label>
                <input text="text" name="title" onChange={this.handleChange} value={title}/>
                <label htmlFor="text">What's your suggestion?</label>
                <textarea text="text" name="text" maxLength="500" rows="6" cols="50" onChange={this.handleChange} value={text}></textarea>
                <button type="submit"> Submit</button>
            </form>
         );
    }
}
 
export default Post;