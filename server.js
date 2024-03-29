const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const postRoutes = require('./routes/posts');
const commentRoutes = require("./routes/comments");
const connectRoutes = require('./routes/connect');
const uploadRoutes = require('./routes/upload');

// .env config
require('dotenv').config({path: './config/.env'})

//passport config
require('./config/passport')(passport)

//DB connection
connectDB()

//Views setup
app.set('view engine','ejs')

//Static folder
app.use(express.static('public'))

//Body parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );

  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Routes
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/connect", connectRoutes);
app.use("/upload", uploadRoutes);



//Server Running
app.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:8750/");
  });
