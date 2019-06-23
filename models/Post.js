const mongoose  = require("mongoose");

const PostSchema = mongoose.Schema({
    title: { type: String, required: true},
    text: { type: String, required: true},
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    }], 
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    }], 
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }, 
    datePosted: { type : Date, default: Date.now },
    comments: [{
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
        },
        datePosted: { type : Date, default: Date.now }, 
        text: { type: String, required: true} 
    }] 
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post