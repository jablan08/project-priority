import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ProductShow extends Component {
    state = {
        product: {},
        email: "",
        name: "",
        password: ""
    };
    componentDidMount() {
        this.handleGetProduct().then(allData => {
        this.setState({
            product: allData
            });
        });
    };
    
    

    handleChange = e => {
        console.log(this.state)
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.handleEdit();
    };
    handleEdit = async () => {
        const { currentUser } = this.props
        const { email, name, password} = this.state
        const obj = {
            email: email === "" ? currentUser.email : email,
            name: name === "" ? currentUser.name : name,
            password
        }
        try {
            const editProduct = await fetch(
                `/product/${this.props.currentUser._id}`,
                {
                method: "PUT",
                body: JSON.stringify(obj),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
                }
            );
        const response = await editProduct.json();
        console.log(response,"=======")
        console.log(response.editedProduct,"=======")
        this.props.setCurrentUser(response.editedProduct);
        this.setState({
            password: ""
        });
        } catch (error) {
            console.log(error);
        }
    };
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
                return parsedResponse.product
            }
        } catch (error) {
            console.log(error)
        }
    }

  render() {
    const { email, name, product } = this.state;
    const { currentUser } = this.props
    console.log(product)
    return (
      <>
        <div style={{ textAlign: "center" }} className="user-info">
            <h1 style={{ textAlign: "center" }}>
                {currentUser && currentUser.name}
            </h1>
            <h1 style={{ textAlign: "center" }}>
                {currentUser && currentUser.email}
            </h1>
            <h1>
                Invite your clients by sharing your unique ID:
            </h1>
            <h2 style={{ textAlign: "center" }}>
                {currentUser && currentUser._id}
            </h2>
            {
                currentUser
                && <h2> {currentUser._id}</h2>
            }
            <form onSubmit={(e)=>this.handleSubmit(e)}>
                <input
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    placeholder={this.props.currentUser.email}
                    value={email}
                    autoComplete="off"
                />
                <br />
                <input
                    type="text"
                    name="name"
                    placeholder={this.props.currentUser.name}
                    value={name}
                    autoComplete="off"
                    onChange={this.handleChange}
                />
                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="new password"
                    onChange={this.handleChange}
                    autoComplete="off"
                />
                <br />

                <button type="submit">
                    Save
                </button>
          </form>
        <button onClick={() => this.props.handleDeleteProduct(currentUser._id)}>
            Delete acccount
        </button>
        </div>
        
      </>
    );
  }
}
export default withRouter(ProductShow);