import React, { Component } from 'react';
import Post from "../Post/Post"
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faTrashAlt, faEdit, faCheckSquare, faComment, faCommentMedical, faCommentDots } from '@fortawesome/free-solid-svg-icons';

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
const MapPostBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    > h1 {
        margin-bottom: 2rem;
        font-size: 3.5rem;
    }
    .li-tags {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 1rem 0;
    }
    .post-content {
        display: flex;
        width: 100%;

    }
    .button-submit {
        border: none;
        background-color: white;
        cursor: pointer;
        font-size: 1.5rem;
    }
    .voted {
        font-size: 1.5rem;
    }
    .button-submit:hover {
        color: rgb(65,105,225);
    }
    .vote-text {
        font-size: 1.5rem;
        text-align: center;
    }
    .post-title-text {
        margin-left: 5rem;
    }
    .post-text {
        margin-top: 1.5rem;
        font-size: 1.5rem;

    }
    .post-title-font {
        font-size: 1.5rem;
    }
    .post-comment-form {
        display: flex;
        flex-direction: column;

    }
    .post-btn {
        margin: .8rem 0 3rem;
    }
`
const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .comment-title {
        margin-bottom: 2rem;
    }
    .comments {
        display: flex;
        flex-direction: column;
    }
    .edit-comment-form {
        display: flex;
        flex-direction: column;
    }
`
class ClientHome extends Component {
    state = { 
        post: [],
        text: "",  
        editComment: false,
        postComment: false,
        showComment: false
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
            console.log(error)
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
        a.votes.length > b.votes.length  ? -1 : b.votes.length  > a.votes.length ? 1 : 0;
    
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
    handleOpenComments = () => 
        this.setState({
            showComment: true
        })
    handleCloseComments = () => 
        this.setState({
            showComment: false
        })
    handleOpenPost = () => 
        this.setState({
            postComment: true
        })
    handleClosePost = () => 
        this.setState({
            postComment: false
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
        console.log(this.state.post[this.state.post.findIndex(i => i._id === id)].comments.filter(d => d._id !== cId))
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
        const { post, text, editComment, postComment, showComment } = this.state
        console.log(this.state)
        const { currentUser } = this.props
        return ( 
            <Container>
                <Post currentUser={currentUser} handleNewPost={this.handleNewPost} />
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
                            <MapPost posts={post} showComment={showComment} handleChange={this.handleChange} currentUser={this.props.currentUser} handleDeletePost={this.handleDeletePost} handleVotes={this.handleVotes} handleComments={this.handleComments} text={text} handleEditComments={this.handleEditComments} handleDeleteComment={this.handleDeleteComment} handleCloseEdit={this.handleCloseEdit} handleOpenEdit={this.handleOpenEdit} editComment={editComment} postComment={postComment} handleCloseComments={this.handleCloseComments} handleOpenComments={this.handleOpenComments} handleOpenPost={this.handleOpenPost} handleClosePost={this.handleClosePost}/>
                            : 
                            <h1> Loading</h1>
                        }

                    </div>

                </SubContainer>
            </Container>
         );
    }
}

const MapPost =({posts, handleDeletePost, handleVotes, currentUser, handleChange, handleComments, text, handleEditComments, handleDeleteComment, handleCloseEdit, handleOpenEdit, handleCloseComments, handleOpenComments, editComment, postComment, showComment, handleOpenPost, handleClosePost})=> 
    <>
        <MapPostBox>
             <h1>Your feature request: </h1>
            { 
                posts.map((p, i) => 
                <li key={i} className="li-tags">
                        <div className="post-content">
                            <div className="post-votes">
                                {
                                    p.votes.includes(currentUser._id) 
                                    ? <h5 className="voted" > Voted </h5> 
                                    : <button className="button-submit"onClick={()=> handleVotes(p._id, i)}>VOTE <FontAwesomeIcon icon={faAngleUp}/> </button> 
                                }
                                <h4 className="vote-text">{p.votes.length}  </h4> 
                            </div>
                            <div className="post-title-text">
                                <div className="post-title">
                                    <h2 className="post-title-font">{p.title}</h2>
                                    <h3 className="span-text">Posted by: {p.clients[0].name} </h3>
                                    <span>{new Date(p.datePosted).toDateString().slice(4)}</span> <br/>
                                </div>
                                <div className="post-text">
                                    <p>{p.text}</p> <br/>
                                </div>

                            </div>
                        </div>
                        <button className="button-submit" onClick={ showComment ? ()=> handleCloseComments() : ()=> handleOpenComments()}> Show Comments <FontAwesomeIcon icon={faComment}/>{p.comments.length}</button>
                        {
                            showComment
                            &&
                            <CommentBox>
                                {
                                    p.comments.map((c,v)=>
                                        <div className="comments" key={v}>
                                            <div className="comment-title-text">
                                                <div className="comment-title">
                                                    <h2>
                                                        Posted by: <span className="span-text"> {c.postedBy === null ? currentUser.name : c.postedBy.name }</span> 
                                                    </h2>
                                                    <h4>{new Date(c.datePosted).toDateString().slice(4)}</h4>
                                                </div>
                                                <div>
                                                    <h4>
                                                        {c.text} 
                                                    </h4>
                                                    {
                                                        c.postedBy !== null
                                                        && currentUser._id === c.postedBy._id
                                                            &&
                                                            <button className="button-submit" onClick={ editComment ? ()=> handleCloseEdit() : ()=> handleOpenEdit()}> Edit comment <FontAwesomeIcon icon={faEdit}/> </button>
                                                    }
                                                </div>
                                            </div>

                                            {
                                                editComment 
                                                &&
                                                <div className="edit-comment-form">
                                                    <form>
                                                        <textarea 
                                                            name="text" 
                                                            maxLength="500" 
                                                            rows="6" 
                                                            cols="50"
                                                            placeholder={c.text} 
                                                            onChange={handleChange}
                                                            >
                                                        </textarea>
                                                    </form>
                                                    <button className="button-submit"  onClick={()=>handleEditComments(p._id, i, c._id)}> Submit Edit <FontAwesomeIcon icon={faCheckSquare}/> </button>
                                                    <button className="button-submit"  onClick={()=>handleDeleteComment(p._id, i, c._id)}> Delete comment <FontAwesomeIcon icon={faTrashAlt}/> </button>
                                                </div>
                                            }

                                        </div>
                                    )
                                }
                            </CommentBox>
                        }
                        <button className="button-submit post-btn" onClick={ postComment ? ()=> handleClosePost() : ()=> handleOpenPost()}> Post a comment <FontAwesomeIcon icon={faCommentMedical}/></button>
                        {
                            postComment
                            &&
                                <div className="post-comment-form">
                                    <form>
                                        <label htmlFor="text" >Comment</label>
                                        <textarea 
                                            name="text" 
                                            maxLength="500" 
                                            rows="6" 
                                            cols="50" 
                                            value={text}
                                            onChange={handleChange}
                                            >
                                        </textarea>
                                    </form>
                                    <button className="button-submit" onClick={()=>handleComments(p._id,i)}>Submit Comment <FontAwesomeIcon icon={faCommentDots}/></button>
                                </div>
                        }
                        {
                            currentUser._id === p.clients[0]._id
                            &&
                            <button className="button-submit" onClick={()=> handleDeletePost(p._id)}> Delete request <FontAwesomeIcon icon={faTrashAlt}/></button>
                        }
                    </li>
                
                )
            }

        </MapPostBox>
    </>
 
export default ClientHome;