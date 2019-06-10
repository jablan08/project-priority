import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    padding: 0 0 30px;
    flex: 1;
`
const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .sub-log-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1 1 auto;
        max-width: 420px;
        border-radius: 5px;
        box-sizing: border-box;
    }
    .login-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .input-box {
        display: flex;
        flex-direction: column;
        padding: 8px 12px;
        background: #fff;
        border: 1px solid #ddd;
        cursor: text;
        box-sizing: border-box;
        border-radius: 5px;
        margin: 1rem 0 2rem 0;
    }
    .sign-box {
        text-align: center;
        margin: 0 0 30px;
        font-size: 1.8rem;
        line-height: 36px;
        letter-spacing: .03em;
        }
    .button-submit {
        border: none;
        background-color: white;
        cursor: pointer;
    }
    .button-submit:hover {
        color: rgb(65,105,225);
    }
    .label-tag {
        font-size: 1.4rem;
    }
    .delete-btn {
        margin: 2rem;
    }
    .h1-tag {
        margin: 1rem 0 1rem 0;
        font-size: 3rem;
    }
    .h2-tag {
        color: rgb(65,105,225);
    }
    .h1-tag-small {
        font-size: 1.8rem;
    }

`

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
            <RegisterContainer>
                <MainBox>

                    <div className="sub-log-box" >
                        <div className="sign-box">
                            <h1 className="h1-tag">
                                {currentUser && currentUser.name}
                            </h1>
                            <h1 className="h1-tag">
                                {currentUser && currentUser.email}
                            </h1>
                            <h1 className="h1-tag-small">
                                Invite your clients by sharing your unique ID:
                            </h1>
                            <h2 className="h1-tag-small h2-tag">
                                {currentUser && currentUser._id}
                            </h2>
                        </div>
                        <div className="login-box">
                            <form onSubmit={(e)=>this.handleSubmit(e)}>
                                <label className="label-tag" htmlFor="email">Edit your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    placeholder={this.props.currentUser.email}
                                    value={email}
                                    autoComplete="off"
                                    className="input-box"
                                    />
                                <br />
                                <label className="label-tag" htmlFor="name">Edit your product's name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={this.props.currentUser.name}
                                    value={name}
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                    className="input-box"
                                    />
                                <br />
                                <label className="label-tag" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="new password"
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    className="input-box"
                                />
                                <br />

                                <button className="button-submit" type="submit">
                                    Save <FontAwesomeIcon icon={faCheckSquare} size="2x" />
                                </button>
                            </form>
                        </div>
                        <button className="button-submit delete-btn" onClick={() => this.props.handleDeleteProduct(currentUser._id)}>
                            Delete acccount <FontAwesomeIcon icon={faTrashAlt} size="2x"/>
                        </button>
                    </div>
                    
                </MainBox>
            </RegisterContainer>
        </>
    );
  }
}
export default withRouter(ProductShow);