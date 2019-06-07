import React, { Component } from 'react';

class ClientHome extends Component {
    state = { 
        post: []
    }

    componentDidMount() {
        this.handleGetPost().then(allData =>{
            this.setState({
                post: allData
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





    render() { 
        const { post } = this.state
        console.log(post)
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
                    <MapPost posts={post} handleDeletePost={this.handleDeletePost}/>
                    : 
                    <h1> Loading</h1>
                }
            </>
         );
    }
}

const MapPost =({posts, handleDeletePost})=> 
   <div>
    { 
         posts.map((p, i) => 
            <li key={i}>
                
                {p.title} <br/>
                {p.text} <br/>
                {p.clients[0].name} <br/>
                {new Date(p.datePosted).toDateString().slice(4)} 
                votes:{p.votes.length} <br/>
                <button onClick={()=> handleDeletePost(p._id)}> Delete </button>
            </li>
        
        )
    }
    </div>
 
export default ClientHome;