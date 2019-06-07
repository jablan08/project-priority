import React, { Component } from 'react';


class ProductHome extends Component {
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
                return parsedResponse
            }
        } catch (error) {
            console.log(error)
        }
    }





    render() { 
        const { post } = this.state
        console.log(post)
        return ( 
            <>
                <h1>hit</h1>
                <h2>{this.props.currentUser._id}</h2>
            </>
         );
    }
}
 
export default ProductHome;