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

//ROUTES

//SEED
app.get('/products/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => { });
    Product.create([
      {
        name: 'Beans',
        description: 'A small pile of beans. Buy more beans for a big pile of beans.',
        img: 'https://imgur.com/LEHS8h3.png',
        price: 5,
        qty: 99
      }, {
        name: 'Bones',
        description: 'It\'s just a bag of bones.',
        img: 'https://imgur.com/dalOqwk.png',
        price: 25,
        qty: 0
      }, {
        name: 'Bins',
        description: 'A stack of colorful bins for your beans and bones.',
        img: 'https://imgur.com/ptWDPO1.png',
        price: 7000,
        qty: 1
      }
    ],
      (error, data) => {
        res.redirect('/products')
      }
    );
  });


//INDEX
app.get("/products" , function (req, res){
    Product.find({}, (error, allProducts)=> {
        res.render("index.ejs" , {
            products: allProducts,
        });
    });
});
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