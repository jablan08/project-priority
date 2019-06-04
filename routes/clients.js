const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const Business = require("../models/Business")



// FIND ALL
router.get('/', async (req, res) => {
  
  try {
    const clients = await Client.find({});
    res.json({clients})
    
  } catch (error) {
    res.json({error})
  }

  return res.json({data: 'Received a GET HTTP method client'});
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
  try {
    const editedBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json({editedBusiness});
  } catch (error) {
    res.json({error})
  }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
  try {
    const deletedBusiness = await Business.findByIdAndRemove(req.params.id);  
    res.json({deletedBusiness})  
    } catch (error) {
      res.json({error})
    }
});

router.post('/new', async (req, res) => {
  try {
    const newUser = await Client.create(req.body)
    res.json({
      newUser,
      success: newUser ? true : false
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
    const foundUser = await Business.findById(req.session.userDbId)

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
    const foundUser = await Business.findById(req.session.userDbId);
   
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
