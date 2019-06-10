import React, { Component } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
        width: 100%
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
`
const CommentBox = styled.div`
    display: none;
    flex-direction: column;
    align-items: center;
`

class ProductHome extends Component {
    state = { 
        post: []
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
            const getPost = await fetch(`/posts/product`, {
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
        const { post, text } = this.state
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
                            <MapPost posts={post} handleChange={this.handleChange} currentUser={this.props.currentUser} handleDeletePost={this.handleDeletePost} handleVotes={this.handleVotes} handleComments={this.handleComments} text={text} handleEditComments={this.handleEditComments} handleDeleteComment={this.handleDeleteComment}/>
                            : 
                            <h1> Loading</h1>
                        }

                    </div>

                </SubContainer>
            </Container>
         );
    }
}

const MapPost =({posts, handleDeletePost, handleVotes, currentUser, handleChange, handleComments, text, handleEditComments, handleDeleteComment})=> 
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
                                    ? <h5> voted </h5> 
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
                        <CommentBox>
                            {
                                p.comments.map((c,v)=>
                                    <div key={v}>
                                        <p>
                                        {c.text} - posted by {c.postedBy === null ? currentUser.name : c.postedBy.name } on... {new Date(c.datePosted).toDateString().slice(4)}
                                        </p>
                                        <button> Edit comment </button>
                                        <div>
                                            <form>
                                                <label htmlFor="text">Edit Comment</label>
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
                                            <button onClick={()=>handleEditComments(p._id, i, c._id)}> edit comment </button>
                                            <button onClick={()=>handleDeleteComment(p._id, i, c._id)}> delete comment </button>
                                        </div>

                                    </div>
                                )
                            }
                        </CommentBox>
                                {/* <form>
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
                                <button onClick={()=>handleComments(p._id,i)} >Post Comment</button> */}
                        <br/>
                        <button className="button-submit" onClick={()=> handleDeletePost(p._id)}> Delete request <FontAwesomeIcon icon={faTrashAlt}/></button>
                    </li>
                
                )
            }

        </MapPostBox>
    </>
 
export default ProductHome;