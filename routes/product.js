const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const Product = require("../models/Product")
const Client = require("../models/Client")



// FIND ALL
router.get('/', async (req, res) => {
  
  try {
    const products = await Product.find({});
    res.json({products})
    
  } catch (error) {
    res.json({error})
  }
});

// SHOW
router.get("/:id", async (req,res)=>{
  try {
    const product = await Product.findById(req.params.id)
    
    res.json({product})
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
    const editedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
    editedProduct.save()
    res.json({
      editedProduct
    });
  } catch (error) {
    res.json({error})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id)
    await Client.deleteMany({_id: { $in: deletedProduct.clients }})
    res.json(deletedProduct)
  } catch (error) {
    console.log(error)
  }
})
// DELETE USER
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndRemove(req.params.id);  
//     res.json({deletedProduct})  
//     } catch (error) {
//       res.json({error})
//     }
// });

router.post('/new', async (req, res) => {
  try {
    console.log(req.body)
    const newProduct = await Product.create(req.body)
    console.log(newProduct)
    res.json({
      newProduct,
      success: newProduct ? true : false
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
    const foundUser = await Product.findById(req.session.userDbId)

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
    const foundUser = await Product.findById(req.session.userDbId);
   
    foundUser.watchList.splice(req.params.id,1)
    await foundUser.save();
    
    res.json({
      foundUser
    });
  } catch(err) {
    res.send(err)
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



module.exports = router;
