const express = require('express');
const router = express.Router();

const Client = require("../models/Client")
const Business = require("../models/Business")
const bcrypt = require('bcryptjs')



router.post("/", async (req,res) =>{
    try {
        
        const foundClient = await Client.findOne({username: req.body.username})
        const foundBusiness = await Business.findOne({name: req.body.name})
      
        if (foundClient){
          if(foundClient.validPassword(req.body.password)) {
        
              
              req.session.logged = true;
              req.session.username = req.body.username;
              req.session.userDbId = foundClient._id;
              
              res.json({
                  user: foundClient,
                  status: 200,
                  success: foundClient ? true : false
              })
          } else {
              req.session.message = "Invalid Username or Password"
              res.json({
                  message: req.session.message
              })
          }
        } else if (foundBusiness) {
            if (foundBusiness.validPassword(req.body.password)) {
              req.session.logged = true;
              req.session.username = req.body.username;
              req.session.businessDbId = foundBusiness._id;
              
              res.json({
                  user: foundBusiness,
                  status: 200,
                  success: foundBusiness ? true : false
              })
          } else {
              req.session.message = "Invalid Username or Password"
              res.json({
                  message: req.session.message
              })
          }
        }
    } catch (error) {
        req.session.message = "Invalid Username or Password"
        res.json({
            message: req.session.message
        })
    }
})
// CREATE
// router.post('/new', async (req, res) => {
//     try {
//       const newUser = await Client.create(req.body)
//       res.json({
//         newUser,
//         success: newUser ? true : false
//       })
      
//     } catch (error) {
//       res.json(error)
//     } 
//   });

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
