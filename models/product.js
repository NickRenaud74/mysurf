const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String, required: true, maxLength: 25},
    description: {type: String, required: true, minLength: 3, maxLength: 500},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    price: {type: Number, required: true, min: 1, max: 999999 },
    inStock: {type: Number, required: true, min: 0, max: 99},
    brand: {type: Schema.Types.ObjectId, ref: 'Brand', required: true},
    image: {type: String}
})

ProductSchema
.virtual('imgSrc')
.get( function() {
    return this.image.slice(8);
})

ProductSchema
.virtual('url')
.get( function() {
    return '/product/' + this._id;
})

module.exports = mongoose.model('Product', ProductSchema)