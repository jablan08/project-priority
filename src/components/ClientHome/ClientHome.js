import React, { Component } from 'react';
import Post from "../Post/Post"
import styled from "styled-components";
import MapPost from "../ClientMapPost/ClientMapPost"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
    display:flex;
    flex-direction: column;
`

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-y: hidden;
    background: #fff;
    padding: 60px 0 90px;
    .button-submit {
        border: none;
        background-color: white;
        cursor: pointer;
        font-size: 1.5rem;
    }
    .button-submit:hover {
        color: rgb(65,105,225);
    }
    
    .header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        border-bottom: 1px solid #efefef;
        margin-bottom: 2.5rem;
    }

    .span-text {
        color: rgb(65,105,225);
    }
    .title {
        margin-bottom: 2rem;
        font-size: 3.5rem;
    }

`
class ClientHome extends Component {
    state = { 
        post: [],
        text: "",  
        editComment: false,
        postComment: false,
        showComment: false,
        newFeature: false,
        selectedComment: "",
        selectedPost: "",
        selectedEdit: "",
        error: ""
    }

    componentDidMount() {
        this.handleGetPost().then(allData =>{
            this.setState({
                post: allData.sort(this.sortPost)
            })
        })
    }
    handleGetClient = async () => {
        try {
            const getClient = await fetch(`/clients/${this.props.currentUser._id}`, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await getClient.json()
            if (parsedResponse) {
                return parsedResponse
            }
        } catch (error) {
            this.setState({
                error: "There was an error in processing this action."
              })
        }
    }
    handleNewPost = (post)=>{
        let postArray = [...this.state.post]
        postArray.push(post)
        this.setState({
            post: postArray.sort(this.sortPost)
        })
    } 
    sortPost = (a,b) =>
        a.votes.length > b.votes.length  ? - 1 : b.votes.length  > a.votes.length ? 1 : 0;
    
    handleGetPost = async () => {
        try {
            const getPost = await fetch(`/posts/clients`, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await getPost.json()
            if (parsedResponse) {
                return parsedResponse.posts
            }
        } catch (error) {
            this.setState({
                error: "There was an error in processing this action."
              })
        }
    }
    handleDeletePost = async id => {
        try {
            const deletePhrase = await fetch(`/posts/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            const response = await deletePhrase.json();
            this.setState({
                post: this.state.post.filter(d => d._id !== id)
            });
            return response;
        } catch (error) {
            this.setState({
                error: "There was an error in processing this action."
            })
        }
    };
    handleVotes = async (id, index) => {
        const obj = {
            client: this.props.currentUser._id
        }
        try {
            const voteUp = await fetch(`/posts/votes/${id}`, {
                method: "PUT",
                body: JSON.stringify(obj),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response = await voteUp.json();
            if (response.success) {
                let postArray = [...this.state.post]
                postArray[index] = response.votePost
                this.setState({
                    post: postArray.sort(this.sortPost)
                })
            }
        } catch (error) {
            this.setState({
                error: "There was an error in processing this action."
              })
        }
    }

    handleChange = (e) =>
    this.setState({
        [e.target.name]: e.target.value
    })

    handleComments = async (id,index) => {
        try {
            const obj = {
                client: this.props.currentUser._id,
                text: this.state.text
            }
            const postComment = await fetch(`/posts/comments/${id}`, {
                method: "PUT",
                body: JSON.stringify(obj),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response = await postComment.json()
            if (response.success) {
                let postArray = [...this.state.post]
                postArray[index] = response.postComment
                this.setState({
                    post: postArray.sort(this.sortPost),
                    text: ""
                })
            }
        } catch (error) {
            this.setState({
                error: "There was an error in processing this action."
            })
        }

    }
    handleNewFeature = () => 
        this.setState({
            newFeature: true
        })
    handleCloseFeature= () => 
        this.setState({
            newFeature: false
        })
    handleOpenEdit = (id) => 
    this.setState({
        editComment: true,
        selectedEdit: id
    })
    handleCloseEdit = () => 
        this.setState({
            editComment: false
        })
    handleOpenComments = (id) => 
        this.setState({
            showComment: true,
            selectedComment: id
        })
    handleCloseComments = () => 
        this.setState({
            showComment: false,
            selectedComment: ""
        })
    handleOpenPost = (id) => 
        this.setState({
            postComment: true,
            selectedPost: id
        })
    handleClosePost = () => 
        this.setState({
            postComment: false,
            selectedPost: ""
        })
    handleEditComments = async (id,index,cId) => {
        try {
            const obj = {
                client: this.props.currentUser._id,
                text: this.state.text,
                commentId: cId
            }
            const postComment = await fetch(`/posts/comments/edit/${id}`, {
                method: "PUT",
                body: JSON.stringify(obj),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response = await postComment.json()
            if (response.success) {
                let postArray = [...this.state.post]
                postArray[index] = response.postComment
                this.setState({
                    post: postArray.sort(this.sortPost),
                    text: ""
                })
            }
            
        } catch (error) {
            this.setState({
                error: "There was an error in processing this action."
              })
        }
    }
    handleDeleteComment = async (id, index, cId) => {
        
        try {
            const obj = {
                commentId: cId
            }
            const deleteComment = await fetch(`/posts/comments/delete/${id}`, {
                method: "PUT",
                body: JSON.stringify(obj),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response = await deleteComment.json();
            if (response.success) {
                let postArray = [...this.state.post]
                postArray[index] = response.postDeletedComment
                this.setState({
                    post: postArray.sort(this.sortPost)
                });
            }
            
        } catch (error) {
            this.setState({
                error: "There was an error in processing this action."
              })
        }
    }

    render() { 
        const { post, text, editComment, postComment, showComment, newFeature, selectedComment, selectedPost, selectedEdit } = this.state
        const { currentUser } = this.props
        return ( 
            <Container>
                <SubContainer>
                    <div className="header">
                        {
                            currentUser
                            && <h2 className="title"> Welcome <span className="span-text">{currentUser.name}</span></h2>
                        }
                    </div>
                    <button className="button-submit" onClick={ newFeature ? ()=> this.handleCloseFeature() : () => this.handleNewFeature() }> Request a new feature! <br/> <FontAwesomeIcon size="2x" icon={faPlusSquare}/></button>
                    {
                        newFeature
                        && 
                        <Post currentUser={currentUser} handleNewPost={this.handleNewPost} handleCloseFeature={this.handleCloseFeature}/>
                    }
                    <div className="map-post-box">
                        {
                            post.length
                            ?
                            <MapPost posts={post} showComment={showComment} handleChange={this.handleChange} currentUser={this.props.currentUser} handleDeletePost={this.handleDeletePost} handleVotes={this.handleVotes} handleComments={this.handleComments} text={text} handleEditComments={this.handleEditComments} handleDeleteComment={this.handleDeleteComment} handleCloseEdit={this.handleCloseEdit} handleOpenEdit={this.handleOpenEdit} editComment={editComment} postComment={postComment} handleCloseComments={this.handleCloseComments} handleOpenComments={this.handleOpenComments} handleOpenPost={this.handleOpenPost} handleClosePost={this.handleClosePost} selectedComment={selectedComment} selectedPost={selectedPost} selectedEdit={selectedEdit}/>
                            : 
                            <h1> Start to give your feedback by posting a feature request! </h1>
                        }

                    </div>

                </SubContainer>
            </Container>
         );
    }
}
 
export default ClientHome;