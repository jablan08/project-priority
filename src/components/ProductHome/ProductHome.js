import React, { Component } from 'react';
import styled from "styled-components";
import MapPost from "../MapPost/MapPost"

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

class ProductHome extends Component {
    state = { 
        post: [],
        editComment: false,
        postComment: false,
        showComment: false,
        selectedComment: "",
        selectedPost: ""
    }

    componentDidMount() {
        this.handleGetPost().then(allData =>{
            this.setState({
                post: allData.sort(this.sortPost)
            })
        })
    }

    sortPost = (a,b) =>
        a.votes.length > b.votes.length  ? -1 : b.votes.length  > a.votes.length ? 1 : 0;


    handleGetProduct = async () => {
        try {
            const getPost = await fetch(`/product/${this.props.currentUser._id}`, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await getPost.json()
            if (parsedResponse) {
                return parsedResponse
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleGetPost = async () => {
        try {
            const getPost = await fetch("/posts/product", {
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
            console.log(error)
        }
    }
    handleRefreshPost = async () => {
        try {
            const getPost = await fetch(`/posts/product`, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await getPost.json()
            console.log(parsedResponse, "========")
            if (parsedResponse) {
                this.setState({
                    post: parsedResponse.posts
                })
            }
        } catch (error) {
            console.log(error)
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
            console.log(error);
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
            console.log(error)
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
                console.log(response)
                let postArray = [...this.state.post]
                postArray[index] = response.postComment
                this.setState({
                    post: postArray.sort(this.sortPost),
                    text: ""
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
    handleOpenEdit = () => 
        this.setState({
            editComment: true
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
                console.log(response)
                let postArray = [...this.state.post]
                postArray[index] = response.postComment
                this.setState({
                    post: postArray.sort(this.sortPost),
                    text: ""
                })
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    handleDeleteComment = async (id, index, cId) => {
        // console.log(this.state.post[this.state.post.findIndex(i => i._id === id)].comments.filter(d => d._id !== cId))
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
                console.log(response)
                let postArray = [...this.state.post]
                postArray[index] = response.postDeletedComment
                this.setState({
                    post: postArray.sort(this.sortPost)
                });
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    render() { 
        const { post, text, editComment, postComment, showComment, selectedComment, selectedPost } = this.state
        console.log(this.state)
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
                    <div className="map-post-box">
                        {
                            post.length
                            ?
                            <MapPost posts={post} showComment={showComment} handleChange={this.handleChange} currentUser={this.props.currentUser} handleDeletePost={this.handleDeletePost} handleVotes={this.handleVotes} handleComments={this.handleComments} text={text} handleEditComments={this.handleEditComments} handleDeleteComment={this.handleDeleteComment} handleCloseEdit={this.handleCloseEdit} handleOpenEdit={this.handleOpenEdit} editComment={editComment} postComment={postComment} handleCloseComments={this.handleCloseComments} handleOpenComments={this.handleOpenComments} handleOpenPost={this.handleOpenPost} handleClosePost={this.handleClosePost} selectedComment={selectedComment} selectedPost={selectedPost}/>
                            : 
                            <h1> <button onClick={this.handleRefreshPost}> Loading  </button></h1>
                        }

                    </div>

                </SubContainer>
            </Container>
         );
    }
}


 
export default ProductHome;