const Brand = require('../models/brand')
const Product = require('../models/product')
const async = require('async')

//Display list of all brands on GET
exports.brandList = (req, res, next) => {
    Brand.find()
        .sort([['name', 'ascending']])
        .exec((err, listBrand) => {
            if (err) return next(err);
            res.render('item_list', {title: 'All Brands', list: listBrand})
        })
};

//Display single brand detail page on GET
exports.brandDetail = (req, res, next) =>  {

    async.parallel({
        brand: function(callback) {
            Brand.findById(req.params.id).exec(callback);
        },
        brandProducts: function(callback) {
            Product.find({ 'brand': req.params.id}).exec(callback)
        }
    }, (err, results) => {
        if (err) return next(err);
        if (results.brand === null) {
            let err = new Error('Brand not found');
            err.status =404;
            return next(err)
        }
        console.log(results.brandProducts);
        res.render('brand_detail', {
            title: results.brand.name, 
            brand: results.brand, 
            brandProducts: results.brandProducts
        })
    });
};

//Display brand create form on GET
exports.brandCreateGet = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: brand create GET')
};

//Handle brand create on POST
exports.brandCreatePost = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: brand create POST')
};

//Display brand delete form on GET
exports.brandDeleteGet = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: brand delete GET')
};

//Handle brand delete on POST
exports.brandDeletePost = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: brand delete POST')
};

//Display brand update form on GET
exports.brandUpdateGet = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: brand update GET')
};

//Handle brand update on POST
exports.brandUpdatePost = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: brand update POST')
};