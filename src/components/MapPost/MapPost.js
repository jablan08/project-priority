import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faTrashAlt, faEdit, faCheckSquare, faComment, faCommentMedical, faCommentDots, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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

const MapPost =({posts, handleDeletePost, handleVotes, currentUser, handleChange, handleComments, text, handleEditComments, handleDeleteComment, handleCloseEdit, handleOpenEdit, handleCloseComments, handleOpenComments, editComment, postComment, showComment, handleOpenPost, handleClosePost, selectedPost, selectedComment, selectedEdit})=> 
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
                        {
                            p.comments.length !== 0
                            &&
                            <button className="button-submit" onClick={ showComment ? ()=> handleCloseComments() : ()=> handleOpenComments(p._id)}> Show Comments <FontAwesomeIcon icon={faComment}/> {p.comments.length}</button>
                        }
                        {
                            showComment && selectedComment === p._id
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
                                                    <button className="button-submit" onClick={ editComment ? ()=> handleCloseEdit() : ()=> handleOpenEdit(p._id)}> Edit comment <FontAwesomeIcon icon={faEdit}/> </button>
                                                </div>
                                            </div>

                                            {
                                                editComment && selectedEdit === p._id
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
                        <button className="button-submit post-btn" onClick={ postComment ? ()=> handleClosePost() : ()=> handleOpenPost(p._id)}> Post a comment <FontAwesomeIcon icon={faCommentMedical}/></button>
                        {
                            postComment && selectedPost === p._id
                            &&
                                <div className="post-comment-form">
                                    <button className="button-submit" onClick={()=> handleClosePost()}> Close <FontAwesomeIcon icon={faTimesCircle}/> </button>
                                    <form>
                                        {/* <label htmlFor="text" >Comment</label> */}
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
                        <button className="button-submit" onClick={()=> handleDeletePost(p._id)}> Delete request <FontAwesomeIcon icon={faTrashAlt}/></button>
                    </li>
                
                )
            }

        </MapPostBox>
    </>
 
export default MapPost;