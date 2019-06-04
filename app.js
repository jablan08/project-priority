const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
// const PORT = 8888;



const loginRouter = require("./routes/login");
const businessRouter = require("./routes/business");
const clientRouter = require("./routes/clients");
const postRouter = require("./routes/post");

const app = express();
require("dotenv").config();
require("./db/db")

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "organized",
  resave: false,
  saveUninitialized: false
}));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));


app.use("/login", loginRouter);
app.use("/business", businessRouter);
app.use("/clients", clientRouter);
app.use("/posts", postRouter);

app.use((req, res, next)=>{
  next(createError(404));
});



module.exports = app;
