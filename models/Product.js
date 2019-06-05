const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const ProductSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    }], 
})

ProductSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) 
}

ProductSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

ProductSchema.pre("save", function(next){
    if(this.isModified("password")){
        this.password = this.hashPassword(this.password)
    }
    next()
})

module.exports = mongoose.model("Product", ProductSchema)