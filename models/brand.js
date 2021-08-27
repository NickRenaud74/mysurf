const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {type: String, required: true, minLength: 2, maxLength: 30},
    description: {type: String, required: true, minLength: 3, maxLength: 100},
    image: {type: String}
});

BrandSchema
.virtual('imgSrc')
.get( function() {
    return this.image.slice(8);
})

BrandSchema
.virtual('url')
.get(function() {
    return '/brand/' + this._id;
})

module.exports = mongoose.model('Brand', BrandSchema);