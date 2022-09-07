//ENABLES MONGOOSE ACCESS
const mongoose = require('mongoose')

//SCHEMA SETUP
const Schema = mongoose.Schema

//CREATES PRODUCT FROM SCHEMA THROUGH MONGOOSE
const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: String,
        img: String,
        price: { type: Number, min: [0, "can't be less than 0"] },
        qty: { type: Number, min: [0, "can't be less than 0"] }
    }
)

//BUILDS PRODUCT MODEL
const Product = mongoose.model('Product', productSchema)

//EXPORTS
module.exports = Product