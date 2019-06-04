const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const BusinessSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    password: {type: String, required: true},
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    }], 
})

BusinessSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) 
}

BusinessSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

BusinessSchema.pre("save", function(next){
    if(this.isModified("password")){
        this.password = this.hashPassword(this.password)
    }
    next()
})

module.exports = mongoose.model("Business", BusinessSchema)