const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const Client = require("../models/Client")
const Product = require("../models/Product")



// FIND ALL
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json({clients})
    
  } catch (error) {
    res.json({error})
  }
});

// SHOW
router.get("/:id", async (req,res)=>{
  try {
    const client = await Client.findById(req.params.id)
    
    res.json({client})
  } catch (error) {
    res.json(error)
  }
})



// EDIT
router.put('/:id', async (req, res) => {
    if(!req.body.password){
      delete req.body.password
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) 
    }
    try {
      const editedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {new:true});
      editedClient.save()
      res.json({
        editedClient
      });
    } catch (error) {
      res.json({error})
    }
  });

// DELETE USER
router.delete('/:id', async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndRemove(req.params.id);  
    res.json({deletedClient})  
    } catch (error) {
      res.json({error})
    }
});

router.post('/new', async (req, res) => {
  try {
    console.log(req.body)
    const newClient = await Client.create(req.body)
    const findProduct = await Product.findById(req.body.product)
    console.log(findProduct, "hittt")
    newClient.product = findProduct
    findProduct.clients.push(newClient)
    console.log(newClient)
    findProduct.save()
    res.json({
      newClient,
      success: newClient ? true : false
    })
    
  } catch (error) {
    res.json(error)
  } 
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
  if(err){
  res.json(err);
  } else {
  res.redirect('/');
  }
  })
})


// ADD TO WATCHLIST
router.post("/add", async (req,res)=> {
  try {
    const foundUser = await Client.findById(req.session.userDbId)

    const team ={
      title:req.body.name,
      image:req.body.image_url,
      id: req.body.id

    }
    foundUser.watchList.push(team)
    await foundUser.save()
    res.json({
      updatedUser: foundUser,
      success: true,
      message: "Add to watch list!"
    })
  } catch (error) {
    console.log(error)
  }
})


// DELETE FROM WATCHLIST
router.delete('/watchlist/:id', async (req, res) => {
  try {
    const foundUser = await Client.findById(req.session.userDbId);
   
    foundUser.watchList.splice(req.params.id,1)
    await foundUser.save();
    
    res.json({
      foundUser
    });
  } catch(err) {
    res.send(err)
  }
});




module.exports = router;
