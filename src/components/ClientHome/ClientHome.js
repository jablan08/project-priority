import React, { Component } from 'react';

class ClientHome extends Component {
    state = { 
        post: [],
        text: ""
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
        const { currentUser } = this.state
        return ( 
            <>
                <div>
                    <h1>hit</h1>
                    <h2>{currentUser && currentUser._id}</h2>
                </div>
                {
                    post.length
                    ?
                    // <ul>
                    //    { post.posts.map((p, i) => 
                    //         <li key={i}>
                    //             {p.title} <br/>
                    //             {p.text} <br/>
                    //             {p.clients[0].name} <br/>
                    //             {new Date(p.datePosted).toDateString()} <br/>
                    //             votes:{p.votes.length} <br/>
                    //         </li>
                    //     )}

                    // </ul>
                    <MapPost posts={post} handleChange={this.handleChange} currentUser={this.props.currentUser} handleDeletePost={this.handleDeletePost} handleVotes={this.handleVotes} handleComments={this.handleComments} text={text} handleEditComments={this.handleEditComments} handleDeleteComment={this.handleDeleteComment}/>
                    : 
                    <h1> Loading</h1>
                }
            </>
         );
    }
}

const MapPost =({posts, handleDeletePost, handleVotes, currentUser, handleChange, handleComments, text, handleEditComments, handleDeleteComment})=> 
   <>
    { 
         posts.map((p, i) => 
            <li key={i}>
                
                {p.title} <br/>
                {p.text} <br/>
                {p.clients[0].name} <br/>
                {new Date(p.datePosted).toDateString().slice(4)} <br/>
                votes:{p.votes.length} 
                {
                    p.votes.includes(currentUser._id) 
                    ? <h2> voted </h2> 
                    : <button onClick={()=> handleVotes(p._id, i)}>VOTE UP</button> 
                }
                {
                    p.comments.map((c,v)=>
                        <div key={v}>
                            <p>
                            {c.text} - posted by {c.postedBy.name} on... {new Date(c.datePosted).toDateString().slice(4)}
                            </p>
                            {
                                currentUser._id === c.postedBy._id
                                && <button> Edit comment </button>
                            }
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
                        <button onClick={()=>handleComments(p._id,i)} >Post Comment</button>
                <br/>
                <button onClick={()=> handleDeletePost(p._id)} > Delete </button>
            </li>
        
        )
    }
    </>
 
export default ClientHome;