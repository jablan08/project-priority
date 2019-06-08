import React, { Component } from 'react';


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
                post: this.state.post.filter(d => d.id !== id)
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    };





    render() { 
        const { post } = this.state
        console.log(post)
        return ( 
            <>
                <div>
                    <h1>hit</h1>
                    <h2>{this.props.currentUser._id}</h2>
                </div>
                {
                    post
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
                    <MapPost post={post}/>
                    : 
                    <h1> Loading</h1>
                }
            </>
         );
    }
}

const MapPost =({post})=> 
   <ul>
    { 
         post.map((p, i) => 
            <li key={i}>
                {p.title} <br/>
                {p.text} <br/>
                {p.clients[0].name} <br/>
                {new Date(p.datePosted).toDateString().slice(4)} <br/>
                votes:{p.votes.length} <br/>
            </li>
        )
    }
    </ul>
 
export default ProductHome;