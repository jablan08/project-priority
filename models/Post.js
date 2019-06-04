const mongoose  = require("mongoose");

const postSchema = mongoose.Schema({
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
    business: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
    }], 
    datePosted: { type: Date },
    comments: [{
        postedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
        }],
        datePosted: { type: Date }, 
        text: { type: String, required: true} 
    }], 
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post