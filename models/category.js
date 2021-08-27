const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {type: String, required: true, maxLength: 30},
    description: {type: String, required: true, maxLength: 100},
    image: {type: String}
});

CategorySchema
.virtual('imgSrc')
.get(function() {
    return this.image.slice(8);
})

CategorySchema
.virtual('url')
.get(function() {
    return '/category/' + this._id;
});

module.exports = mongoose.model('Category', CategorySchema);