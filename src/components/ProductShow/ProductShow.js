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
    }
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
    // console.log(product)
    return (
      <>
        <div className="user-info">
            <h5 style={{ textAlign: "center" }}>
                {currentUser && currentUser.name}
            </h5>
            <h6 style={{ textAlign: "center" }}>
                {currentUser && currentUser.email}
            </h6>
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
        </div>
        <button href="#modal5" className="modal-trigger">
            Delete account
        </button>
        <form id="modal5">
            Before you go....
            <h6 style={{ textAlign: "center" }}> Is it Goodbye?</h6>
            <br />
            <p style={{ textAlign: "center" }}>
                The account will no longer be available, and all data in the account
                will be permanently deleted.
            </p>
            <button
                onClick={() => this.props.handleDeleteProduct(currentUser._id)}
                className="deleteBtn"
            >
                Yes!
            </button>
        </form>
      </>
    );
  }
}
export default withRouter(ProductShow);