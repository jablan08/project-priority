const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const ClientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    role: String,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    company: {type: String, required: true},
    email: {type: String, unique: true, required: true}

})

ClientSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) 
}

ClientSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

ClientSchema.pre("save", function(next){
    if(this.isModified("password")){
        this.password = this.hashPassword(this.password)
    }
    next()
})

module.exports = mongoose.model("Client", ClientSchema)