//////////////
//DEPENDENCIES ------------------
//////////////
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const products = require('./models/products.js');
const methodOverride = require("method-override");
require('dotenv').config();

/////////////////////
//DATABASE CONNECTION -------------
/////////////////////



//////////////////////
//DATABASE CONNECTION ERROR / SUCCESS
//////////////////////

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
  console.log("listening in port...", PORT);
})