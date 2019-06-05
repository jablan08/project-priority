import React, { Component } from 'react';

import { Redirect } from "react-router-dom"

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
        productFetch: null
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
                    this.props.setCurrentUser(parsedResponse.newProduct)
            
                    this.setState({
                        logged: true
                    })
                }
        } catch (error) {
            console.log(error)
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
                    productFetch: parsedResponse.product.name  
                })
            }
        } catch (error) {
            
        }
    }    
    handleClientSubmit = async (e) => {
        e.preventDefault();
        try {
            const createUser = await fetch("/clients/new", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await createUser.json();
                if (parsedResponse.success) {
                    this.props.setCurrentUser(parsedResponse.newUser)
            
                    this.setState({
                        logged: true
                    })
                }
        } catch (error) {
            console.log(error)
        }
    }
    
    render() { 
        
        const { name, password, logged, client, product, productId, productFetch } = this.state
        return ( 
            <>
                <div>
                    <h1>
                        Register your product or register your business using a product.
                    </h1>
                    <button onClick={this.showProductForm}>Product</button>
                    <button onClick={this.showClientForm}>Business</button>
                </div>
                {
                    product
                    ?
                        logged
                        ? <Redirect to={`/product/${this.props.currentUser._id}`}/>
                        : <ProductRegisterForm
                            handleChange = {this.handleChange}
                            handleProductSubmit = {this.handleProductSubmit}
                            name = {name}
                            password = {password}
                        />
                    : client && productFetch
                        ? logged
                            ? 
                            <Redirect to={`/product/${this.props.currentUser._id}`}/>
                            :
                            <ClientRegisterForm
                            handleChange = {this.handleChange}
                            handleClientSubmit = {this.handleClientSubmit}
                            name = {name}
                            password = {password}
                            />
                        
                        : client
                        &&
                        <GetProductForm
                        handleChange = {this.handleChange}
                        handleGetProduct = {this.handleGetProduct}
                        />
                
                }
            </>
         );
    }
}
 const ProductRegisterForm = ({handleChange, handleProductSubmit, name, password, email}) =>
    <form onSubmit={e => handleProductSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} value={name}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleChange}value={password}/>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={handleChange}value={email}/>
        <button type="submit">SUBMIT </button>
    </form>
    
 const ClientRegisterForm = ({handleChange, handleClientSubmit, name, password, role, company, email}) =>
    <form onSubmit={e => handleClientSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} value={name}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleChange}value={password}/>
        <label htmlFor="role">Role</label>
        <input type="text" name="role" onChange={handleChange} value={role}/>
        <label htmlFor="company">Company</label>
        <input type="text" name="company" onChange={handleChange} value={company}/>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={handleChange} value={email}/>
        <button type="submit">SUBMIT </button>
    </form>
const GetProductForm = ({handleChange, handleGetProduct}) => 
    <form onSubmit={e => handleGetProduct(e)}>
        <label htmlFor="productId">Enter the unique product ID of that your business is using!</label>
        <input type="text" name="productId" onChange={handleChange}/>
        <button type="submit">Find Product</button>
    </form>


export default Register;