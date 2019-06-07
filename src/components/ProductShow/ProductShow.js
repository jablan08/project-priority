import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Button, Modal } from "react-materialize";

class ProductShow extends Component {
    state = {
        data: null,
        username: "",
        email: "",
        password: ""
    };
    componentDidMount() {
        this.handleGetProduct().then(allData => {
        this.setState({
            data: allData
            });
        });
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.handleEdit();
    };
    handleEdit = async () => {
        try {
            const editProduct = await fetch(
                `/product/${this.props.currentUser.id}`,
                {
                method: "PUT",
                body: JSON.stringify(this.state),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
                }
            );
        const response = await editProduct.json();
        this.props.setCurrentUser(response);
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
                return parsedResponse
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleDeletePhrase = async id => {
        try {
            const deletePhrase = await fetch(`http://localhost:5000/phrases/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            const response = await deletePhrase.json();
            this.setState({
                data: this.state.data.filter(d => d.id !== id)
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    };

  render() {
    const { data} = this.state;
    const { currentUser } = this.props;
    return (
      <>
        <div className="user-info">
            <h5 style={{ textAlign: "center" }}>
                {currentUser && currentUser.username}
            </h5>
            <h6 style={{ textAlign: "center" }}>
                {currentUser && currentUser.email}
            </h6>
            <h6 style={{ textAlign: "center" }}>
                {currentUser && currentUser.primaryLanguage}
             </h6>
          <Button type="submit" href="#modal4" className="modal-trigger">
            Edit
          </Button>
          <Modal id="modal4">
            <input
                type="text"
                name="username"
                 placeholder="new username"
                value={this.props.currentUser.username}
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
            <input
                type="email"
                name="email"
                value={this.props.currentUser.email}
                placeholder="new email"
                onChange={this.handleChange}
                autoComplete="off"
            />
            <br />

            <Button
                onClick={() => this.handleEdit(this.state)}
                className="modal-close"
            >
              Save
            </Button>
          </Modal>
        </div>
        <Button href="#modal5" className="modal-trigger">
            Delete account
        </Button>
        <Modal id="modal5">
            Before you go....
            <h6 style={{ textAlign: "center" }}> Is it Goodbye?</h6>
            <br />
            <p style={{ textAlign: "center" }}>
                The account will no longer be available, and all data in the account
                will be permanently deleted.
            </p>
            <Button
                onClick={() => this.props.handleDeleteUser(currentUser.id)}
                className="deleteBtn"
            >
                Yes!
            </Button>
            <Button className="modal-close deleteBtn">I will stay</Button>
            </Modal>
      </>
    );
  }
}
export default withRouter(ProductShow);