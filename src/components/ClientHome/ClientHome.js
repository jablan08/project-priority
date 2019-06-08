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
        const obj = {
            client: this.props.currentUser._id,
            // postedBy: ,
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
                    <MapPost posts={post} handleChange={this.handleChange} currentUser={this.props.currentUser} handleDeletePost={this.handleDeletePost} handleVotes={this.handleVotes} handleComments={this.handleComments} text={text}/>
                    : 
                    <h1> Loading</h1>
                }
            </>
         );
    }
}

const MapPost =({posts, handleDeletePost, handleVotes, currentUser, handleChange, handleComments, text})=> 
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
                        
                        <p key={v}>{c.text} - posted by {c.postedBy.name} on... {new Date(c.datePosted).toDateString().slice(4)}</p>
                    
                    )
                }
                        <form key={35}>
                            <label htmlFor="text" key={20}>Comment</label>
                            <textarea 
                                name="text" 
                                maxLength="500" 
                                rows="6" 
                                cols="50" 
                                onChange={handleChange}
                                key={i}>
                            </textarea>
                        </form>
                        <button onClick={()=>handleComments(p._id,i)} key={23}>Post Comment</button>
                <br/>
                <button onClick={()=> handleDeletePost(p._id)} key={24}> Delete </button>
            </li>
        
        )
    }
    </>
 
export default ClientHome;