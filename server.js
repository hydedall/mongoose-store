require('dotenv').config();
//////////////
//DEPENDENCIES ------------------
//////////////
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const Product = require('./models/products');

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride())
app.use(express.static(__dirname + '/public')); 

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
app.get("/products", function (req, res) {
    Product.find({}, (error, allProducts) => {
        res.render("index.ejs", {
            products: allProducts,
        });
    });
});

//NEW
app.get("/products/new", function (req, res) {
    res.render("new.ejs")
});

//DELETE

//UPDATE
app.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // LETS IT RECIEVE THE UPDATED DOCUMENT AND OVERRIDES PREVIOUS DATA WITH req.body
    }, () => {
        res.redirect(`/products/${req.params.id}`)
    })
});

//CREATE
app.post('/products', (req, res) => {
    Product.create(req.body, () => {
        res.redirect('/products')
    })
});

//EDIT

//SHOW
app.get("/products/:id", (req, res)=>{
    Product.findById(req.params.id, (err, foundProduct)=>{
        res.render("show.ejs" , {
            product: foundProduct,
        });
    });
});

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("listening to port...", PORT);
})