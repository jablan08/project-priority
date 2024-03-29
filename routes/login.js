const express = require('express');
const router = express.Router();

const Client = require("../models/Client")
const Product = require("../models/Product")
const bcrypt = require('bcryptjs')



router.post("/", async (req,res) =>{
    try {
        
        const foundClient = await Client.findOne({email: req.body.email})
        const foundProduct = await Product.findOne({email: req.body.email})
      
        if (foundClient){
          if(foundClient.validPassword(req.body.password)) {
        
              
              req.session.logged = true;
              req.session.email = req.body.email;
              req.session.userDbId = foundClient._id;
              req.session.productDbId = foundClient.product
            
              res.json({
                  user: foundClient,
                  status: 200,
                  success: foundClient ? true : false
              })
          } else {
              req.session.message = "Invalid Email or Password"
              res.json({
                  message: req.session.message
              })
          }
        } else if (foundProduct) {
            if (foundProduct.validPassword(req.body.password)) {
              req.session.logged = true;
              req.session.email = req.body.email;
              req.session.productDbId = foundProduct._id;
              
              res.json({
                  user: foundProduct,
                  status: 200,
                  success: foundProduct ? true : false
              })
          } else {
              req.session.message = "Invalid Email or Password"
              res.json({
                  message: req.session.message
              })
          }
        } else {
            req.session.message = "Invalid Email or Password"
            res.json({
                message: req.session.message
            })
        }
    } catch (error) {
        req.session.message = "Invalid Username or Password"
        res.json({
            message: req.session.message
        })
    }
})


router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
    if(err){
    res.json(err);
    } else {
    res.redirect('/');
    }
    })
})

module.exports = router;
