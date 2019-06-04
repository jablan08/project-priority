const mongoose  = require("mongoose");

const postSchema = mongoose.Schema({
    name: String,
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
        name: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
        }] 
    }], 
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post