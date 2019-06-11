const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI;
console.log(connectionString)
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on("connected", (err)=>{
    console.log("Mongoose connected to ", connectionString)
});

mongoose.connection.on("disconnected", (err)=>{
    console.log("Mongoose disconnected to ", connectionString);
});

mongoose.connection.on("error", (error) => {
    console.log("Mongoose error ", error)
});