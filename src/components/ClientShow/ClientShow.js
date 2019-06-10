import React, { Component } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

class ClientShow extends Component {
    state = {
        product: {},
        email: "",
        name: "",
        password: ""
    };
    componentDidMount() {
        this.handleGetClient().then(allData => {
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
                `/clients/${this.props.currentUser._id}`,
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
        this.props.setCurrentUser(response.editedClient);
        this.setState({
            password: "",
            name: "",
            email: ""
        });
        } catch (error) {
            console.log(error);
        }
    };
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
                return parsedResponse.client
            }
        } catch (error) {
            console.log(error)
        }
    }

  render() {
    const { email, name, clients } = this.state;
    const { currentUser } = this.props
    console.log(clients)
    return (
      <>
        <div style={{ textAlign: "center" }} className="user-info">
            <h1 style={{ textAlign: "center" }}>
                {currentUser && currentUser.name}
            </h1>
            <h1 style={{ textAlign: "center" }}>
                {currentUser && currentUser.email}
            </h1>
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
 
export default ClientShow;