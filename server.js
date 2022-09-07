require('dotenv').config();
//////////////
//DEPENDENCIES ------------------
//////////////
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require("method-override");

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

/////////////////////
//DATABASE CONNECTION -------------
/////////////////////
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//////////////////////
//DATABASE CONNECTION ERROR / SUCCESS
//////////////////////
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//INDEX
//NEW
//DELETE
//UPDATE
//CREATE
//EDIT
//SHOW


// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("listening to port...", PORT);
})