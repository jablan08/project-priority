const express = require('express');
const router = express.Router();


const Client = require("../models/Client")
const Product = require("../models/Product")
const Post = require("../models/Post")



// FIND ALL
router.get('/clients', async (req, res) => {
  
  try {
    const posts = await Post.find({"product": req.session.productDbId}).populate("clients").populate("product").populate("comments.postedBy").exec();
    res.json({
      posts
    })
    
  } catch (error) {
    res.json({error})
  }

});
router.get('/product', async (req, res) => {
  
  try {
    const posts = await Post.find({"product": req.session.productDbId}).populate("clients").populate("comments.postedBy").exec();
    res.json({posts})
    
  } catch (error) {
    res.json({error})
  }

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
router.put('/votes/:id', async (req, res) => {

  try {
    const votePost = await Post.findById(req.params.id).populate("clients").populate("comments.postedBy").exec();

    votePost.votes.push(req.body.client)

    await votePost.save()

    res.json({
      votePost,
      success: votePost ? true : false
    });
  } catch (error) {
    res.json({error})
  }
});

router.put("/comments/:id", async (req,res) => {
  try {
    const findClient = await Client.findById(req.body.client)
    req.body.postedBy = findClient
    const postComment = await Post.findById(req.params.id).populate("clients").populate("product").populate("comments.postedBy").exec();
    postComment.comments.push(req.body)
    postComment.save()
    res.json({
      postComment,
      success: postComment ? true : false
    })
  } catch (error) {
    res.json({error})
  }
})

router.put("/comments/edit/:id", async (req,res) => {
  try {
    const findClient = await Client.findById(req.body.client)
    req.body.postedBy = findClient
    const postComment = await Post.findById(req.params.id).populate("clients").populate("product").populate("comments.postedBy").exec();
    postComment.comments[postComment.comments.findIndex(i => i._id == req.body.commentId)].text = req.body.text
    postComment.save()
    res.json({
      postComment,
      success: postComment ? true : false
    })
  } catch (error) {
    res.json({error})
  }
})


router.put('/:id', async (req, res) => {
  try {
    const editedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json({editedPost});
  } catch (error) {
    res.json({error})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndRemove(req.params.id);  
    res.json({deletedPost})  
    } catch (error) {
      res.json({error})
    }
});

router.put("/comments/delete/:id", async (req, res) => {
  try {
    const postDeletedComment = await Post.findById(req.params.id).populate("clients").populate("comments.postedBy").exec();
    (postDeletedComment.comments.findIndex(i => i._id == req.body.commentId))
    postDeletedComment.comments.splice(postDeletedComment.comments.findIndex(i => i._id == req.body.commentId),1)
    postDeletedComment.save()
    res.json({
      postDeletedComment,
      success: postDeletedComment ? true : false
    })
  } catch (error) {
    res.json({error})
  }
})

router.post('/new', async (req, res) => {
  try {
    const findClient = await Client.findById(req.body.currentUser._id)
    const findProduct = await Product.findById(req.body.currentUser.product)
    req.body.clients = findClient
    req.body.product = findProduct
    const newPost =  await Post.create(req.body)
    const findPost = await Post.findById(newPost._id).populate("clients").populate("comments.postedBy").exec();
    res.json({
      findPost,
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

module.exports = router;
