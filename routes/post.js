const express = require('express');
const router = express.Router();


const Client = require("../models/Client")
const Product = require("../models/Product")
const Post = require("../models/Post")



// FIND ALL
router.get('/clients', async (req, res) => {
  
  try {
    const posts = await Post.find({"product": req.session.productDbId}).populate("comments.postedBy").exec();
    console.log(posts)
    res.json({posts})
    
  } catch (error) {
    res.json({error})
  }

});
router.get('/product', async (req, res) => {
  
  try {
    const posts = await Post.find({"product": req.session.productDbId}).populate("clients").exec()
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
  console.log(req.body, "body")
  console.log(req.body.client, "body")
  try {
    const votePost = await Post.findById(req.params.id);

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
    console.log(req.body.client)
    console.log(req.body, "============")
    req.body.postedBy = findClient
    const postComment = await Post.findById(req.params.id)
    postComment.comments.push(req.body)
    postComment.save()
    res.json({
      postComment,
      success: postComment ? true : false
    })
  } catch (error) {
    console.log(error)
  }
})

router.put("/comments/edit/:id", async (req,res) => {
  try {
    const findClient = await Client.findById(req.body.client)
    console.log(req.body.client)
    console.log(req.body, "============")
    console.log(req.body.commentId, "============")
    req.body.postedBy = findClient
    const postComment = await Post.findById(req.params.id)
    console.log(postComment.comments[0]._id, "++++++")
    console.log(postComment.comments.findIndex(i => i._id == req.body.commentId))
    postComment.comments[postComment.comments.findIndex(i => i._id == req.body.commentId)].text = req.body.text
    postComment.save()
    res.json({
      postComment,
      success: postComment ? true : false
    })
  } catch (error) {
    console.log(error)
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
    // req.body.clients=[]
    // req.body.product =[]
    console.log(req.body)
    console.log(req.body.currentUser)
    // console.log(req.session)
    const findClient = await Client.findById(req.body.currentUser._id)
    console.log(findClient, "foundclient==========================")
    const findProduct = await Product.findById(req.body.currentUser.product)
    console.log(findProduct, "foundProducy================")
    req.body.clients = findClient
    req.body.product = findProduct
    const newPost =  await Post.create(req.body)
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
