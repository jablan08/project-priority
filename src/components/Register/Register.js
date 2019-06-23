import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faBriefcase, faBuilding }from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

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
        font-size: 24px;
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
    .button-submit-top {
        border: none;
        background-color: white;
        cursor: pointer;
        font-size: 2rem;
    }
    .button-submit-top:hover {
        color: rgb(65,105,225);
    }
    .button-submit-top:focus {
        color: red;
    }

    .buttons-top {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        margin-bottom: 2rem;
    }
    .label-tag {
        font-size: 1.4rem;
    }
    .product-get-form {
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    .input-box-get {
        display: flex;
        flex-direction: column;
        padding: 8px 12px;
        background: #fff;
        border: 1px solid #ddd;
        cursor: text;
        box-sizing: border-box;
        border-radius: 5px;
        margin: 2rem 0 2rem 0;
    }
    .product-span {
        color: rgb(65,105,225);
    }
`

class Register extends Component {
    state = { 
        name: "",
        password: "",
        logged: false,
        product: false,
        client: false,
        role: "",
        company: "",
        email: "",
        productId: "",
        productFetch: null,
        nofind: "",
        errorMsgClient: "",
        errorMsgProduct: ""
    }  
    handleChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value
    })
   
    handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const createProduct = await fetch("/product/new", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await createProduct.json();
            console.log(parsedResponse)
                if (parsedResponse.success) {
                    localStorage.setItem("user", JSON.stringify(parsedResponse.newProduct));
                    this.props.setCurrentUser(parsedResponse.newProduct)
            
                    this.setState({
                        logged: true,
                        errorMsgProduct: ""
                    })
                }
        } catch (error) {
            if (error.code === 11000) {
                this.setState({
                    errorMsgProduct: "This email has already registered. Please enter a different email."
                })
            } else if (error.name === "ValidationError" ){
                this.setState({
                    errorMsgProduct: "Please fill out all required fields."
                })
            }
        }
    }
    showProductForm = () =>
        this.setState({
            product: true,
            client: false
        })
    
    showClientForm = () =>
        this.setState({
            client: true,
            product: false
        })
        
    handleGetProduct = async (e) => {
        e.preventDefault();
        try {
            const getProduct = await fetch(`/product/${this.state.productId}`, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await getProduct.json()
            console.log(parsedResponse)
            if (parsedResponse) {
                this.setState({
                    productFetch: parsedResponse.product.name,
                    noFind: ""  
                })
            }
        } catch (error) {
            this.setState({
                noFind: "There was an error. We could not find a product with that ID."
            })
        }
    }    
    handleClientSubmit = async (e) => {
        e.preventDefault();
        const { name, password, role, company, email, productId } = this.state
        const obj = {
            name,
            password,
            role,
            email,
            company,
            product: productId
        }
        try {
            const createClient = await fetch("/clients/new", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await createClient.json();
            console.log(parsedResponse)
                if (parsedResponse.success) {
                    localStorage.setItem("user", JSON.stringify(parsedResponse.newClient));
                    this.props.setCurrentUser(parsedResponse.newClient)
                    this.setState({
                        logged: true,
                        errorMsgClient: ""
                    })
                } else if (parsedResponse.error.code === 11000) {
                    this.setState({
                        errorMsgClient: "This email has already registered. Please enter a different email."
                    })
                } else if (parsedResponse.error.name === "ValidationError" ){
                    this.setState({
                        errorMsgClient: "Please fill out all required fields."
                    })
                }
        } catch (error) {
           
        }
    }
    
    render() { 
        
        const { name, password, logged, client, product, productFetch, email, role, company, noFind, errorMsgClient, errorMsgProduct } = this.state
        return ( 
            <RegisterContainer>
                <MainBox>
                    <div>
                        <h1 className="sign-box">
                            Register your product or register your business using a product.
                        </h1>
                        <div className="buttons-top">

                            <button className="button-submit-top" onClick={this.showProductForm}>Product <br/><FontAwesomeIcon size="3x" icon={faBriefcase}/></button>
                            <button className="button-submit-top" onClick={this.showClientForm}>Business <br/><FontAwesomeIcon size="3x" icon={faBuilding}/></button>
                        </div>
                    </div>
                    <div className="sub-log-box">
                        {
                            product
                            ?
                                logged
                                ? <Redirect to={`/product/home/${this.props.currentUser._id}`}/>
                                : <ProductRegisterForm
                                    handleChange = {this.handleChange}
                                    handleProductSubmit = {this.handleProductSubmit}
                                    name = {name}
                                    password = {password}
                                    email = {email}
                                    errorMsgProduct={errorMsgProduct}
                                />
                            : client && productFetch !== null
                                ? logged
                                    ? 
                                    <Redirect to={`/clients/home/${this.props.currentUser._id}`}/>
                                    :
                                    <ClientRegisterForm
                                    handleChange = {this.handleChange}
                                    handleClientSubmit = {this.handleClientSubmit}
                                    name = {name}
                                    password = {password}
                                    email = {email}
                                    role = {role}
                                    company = {company}
                                    productFetch = {productFetch}
                                    errorMsgClient={errorMsgClient}
                                    />
                                
                                : client
                                &&
                                <GetProductForm
                                handleChange = {this.handleChange}
                                handleGetProduct = {this.handleGetProduct}
                                noFind={noFind}
                                
                                />
                        }
                    </div>
                </MainBox>
            </RegisterContainer>
         );
    }
}
 const ProductRegisterForm = ({handleChange, handleProductSubmit, name, password, email, errorMsgProduct}) =>
    <form onSubmit={e => handleProductSubmit(e)}>
        {
            errorMsgProduct
            && <h3 style={{textAlign: "center", color: "red"}}> {errorMsgProduct}</h3>
        }
        <label className="label-tag" htmlFor="name">Name</label>
        <input className="input-box" type="text" name="name" onChange={handleChange} value={name}/>
        <label className="label-tag" htmlFor="password">Password</label>
        <input className="input-box" type="password" name="password" onChange={handleChange}value={password} autoComplete=""/>
        <label className="label-tag" htmlFor="email">Email</label>
        <input className="input-box" type="email" name="email" onChange={handleChange}value={email}/>
        <button type="submit" className="button-submit"> Submit <FontAwesomeIcon size="lg" icon={faSignInAlt}/></button>
    </form>
    
 const ClientRegisterForm = ({handleChange, handleClientSubmit, name, password, role, company, email, productFetch, errorMsgClient}) =>
    <>
    <h2 className="sign-box">You are registering for <span className="product-span">{productFetch}</span></h2>
    <form className="product-get-form" onSubmit={e => handleClientSubmit(e)}>
        {
            errorMsgClient
            && <h3 style={{textAlign: "center", color: "red"}}> {errorMsgClient}</h3>
        }
        <label className="label-tag" htmlFor="name">Name</label>
        <input className="input-box" type="text" name="name" onChange={handleChange} value={name}/>
        <label className="label-tag" htmlFor="password">Password</label>
        <input className="input-box" type="password" name="password" onChange={handleChange}value={password} autoComplete=""/>
        <label className="label-tag" htmlFor="role">Role</label>
        <input className="input-box" type="text" name="role" onChange={handleChange} value={role}/>
        <label className="label-tag" htmlFor="company">Company</label>
        <input className="input-box" type="text" name="company" onChange={handleChange} value={company}/>
        <label className="label-tag" htmlFor="email">Email</label>
        <input className="input-box" type="email" name="email" onChange={handleChange} value={email}/>
        <button type="submit" className="button-submit"> Submit <FontAwesomeIcon size="lg" icon={faSignInAlt}/></button>
    </form>
    </>

const GetProductForm = ({handleChange, handleGetProduct, noFind}) =>
    <form className="product-get-form" onSubmit={e => handleGetProduct(e)}>
        <label className="label-tag" htmlFor="productId"> Enter the unique product ID of that your product is using! </label>
        <input className="input-box-get" type="text" name="productId" onChange={handleChange}/>
        <button type="submit" className="button-submit"> Submit <FontAwesomeIcon size="lg" icon={faSignInAlt}/></button>
        {
            noFind
            && <h3 style={{textAlign: "center", color: "red"}}> {noFind}</h3>
        }
    </form>


export default Register;