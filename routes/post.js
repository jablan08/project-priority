const express = require('express');
const router = express.Router();

const Client = require("../models/Client")
const Business = require("../models/Business")
const Post = require("../models/Post")



// FIND ALL
router.get('/', async (req, res) => {
  
  try {
    const posts = await Post.find({});
    res.json({posts})
    
  } catch (error) {
    res.json({error})
  }

  return res.json({data: 'Received a GET HTTP method post'});
});

// SHOW
router.get("/:id", async (req,res)=>{
  try {
    const post = await Post.findById(req.params.id)
    
    res.json({post})
  } catch (error) {
    res.json(error)
  }
})



// EDIT
router.put('/:id', async (req, res) => {
  try {
    const editedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json({editedPost});
  } catch (error) {
    res.json({error})
  }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndRemove(req.params.id);  
    res.json({deletedPost})  
    } catch (error) {
      res.json({error})
    }
});

router.post('/new', async (req, res) => {
  try {
    const newPost = await Post.create(req.body)
    res.json({
      newPost,
      success: newPost ? true : false
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
    const foundUser = await Post.findById(req.session.userDbId)

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
    const foundUser = await Post.findById(req.session.userDbId);
   
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
