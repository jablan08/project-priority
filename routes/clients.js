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
    const findProduct = await Product.findOne({"clients": req.params.id})
    const client = await Client.findById(req.params.id)
    
    res.json({
        client,
        findProduct
    })
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

// DELETE CLIENT
router.delete('/:id', async (req, res) => {
  try {
    const findProduct = await Product.findOne({"clients": req.params.id})
    const deleteClient = await Client.findByIdAndRemove(req.params.id);  
    // const [foundProduct, deletedClient] = await Promise.all([findProduct, deleteClient])
    findProduct.clients.remove(req.params.id)
    await findProduct.save()
    res.json({
        deleteClient,
        findProduct
    })  
    } catch (error) {
      res.json({error})
    }
});

router.post('/new', async (req, res) => {
  try {
    
    const findProduct = await Product.findById(req.body.product)
    req.body.product = findProduct
    const newClient = await Client.create(req.body) 
    findProduct.clients.push(newClient)
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
    res.json({
      error
    })
  }
})

module.exports = router;
