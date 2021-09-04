const Product = require('../models/product')
const Brand = require('../models/brand')
const Category = require('../models/category')

const async = require('async')
const { body, validationResult } = require('express-validator')

//Display list of all products on GET
exports.productList = (req, res, next) => {
    Product.find()
        .populate('brand')
        .populate('category')
        .exec((err, listProduct) => {
            if(err) return next(err);
            //console.log(listProduct);
            res.render('item_list', {title: 'All Products', list: listProduct})
        })
};

//Display single product detail page on GET
exports.productDetail = (req, res, next) =>  {

    async.parallel({
        brands: function(callback) {
            Brand.find(callback);
        },
        categories: function(callback) {
            Category.find(callback)
        },
    }, function(err, results) {
        if(err) return next(err);

        Product.findById(req.params.id)
        .populate('brand')
        .populate('category')
        .exec((err, product) => {
            if (err) return next(err);
            if (product === null) {
                let err = new Error('Product not found');
                err.status = 404;
                return next(err);
            }
            console.log(product);
            res.render('product_detail', {
                title: product.name, 
                product: product, 
                categories: results.categories,
                brands: results.brands,
            })
        });
    })
};

//Display product create form on GET
exports.productCreateGet = (req, res, next) => {

    //Get all brands, categories to use for product form
    async.parallel({
        brands: function(callback) {
            Brand.find(callback);
        },
        categories: function(callback) {
            Category.find(callback)
        }
    }, function(err, results) {
        if (err) return next(err);
        res.render('product_form', {
            title: 'Create a new Product', 
            brands: results.brands,
            categories: results.categories
        })
    })
};

//Handle product create on POST
exports.productCreatePost = [

    //Validate and sanitize all fields first
    body('name', 'Name must not be empty').trim().isLength({min: 1}).escape(),
    body('description', 'Description must not be empty').trim().isLength({min: 1}).escape(),
    body('category', 'Category must not be empty').trim().isLength({min: 1}).escape(),
    body('brand', 'Brand must not be empty').trim().isLength({min: 1}).escape(),
    body('price', 'Price must not be empty').isFloat().escape(),
    body('inStock', 'Stock must not be empty').isInt().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            brand: req.body.brand,
            price: req.body.price,
            inStock: req.body.inStock,
            image: req.file.destination + req.file.filename
        });
        console.log(errors);
        if (!errors.isEmpty()) {
            async.parallel({
                brands: function(callback) {
                    Brand.find(callback);
                },
                categories: function(callback) {
                    Category.find(callback)
                }
            }, function(err, results) {
                if (err) return next(err);
                res.render('product_form', {
                    title: 'Create a new Product', 
                    brands: results.brands,
                    categories: results.categories,
                    product: product,
                    errors: errors.array(),
                });
            });
            return;
        } else {
            //Data from form is valid
            product.save(function (err) {
                if (err) return next(err);

                res.redirect(product.url);
            })
        }
    }
]

//Handle product delete on POST
exports.productDeletePost = (req, res, next) => {
    Product.findByIdAndRemove(req.body.productid, function deleteProduct(err) {
        if (err) return next(err);
        res.redirect('/products')
    })
};

//Handle product update on POST
exports.productUpdatePost = [

    //Validate and sanitize all fields first
    body('name', 'Name must not be empty').trim().isLength({min: 1}).escape(),
    body('description', 'Description must not be empty').trim().isLength({min: 1}).escape(),
    body('category', 'Category must not be empty').trim().isLength({min: 1}).escape(),
    body('brand', 'Brand must not be empty').trim().isLength({min: 1}).escape(),
    body('price', 'Price must not be empty').isFloat().escape(),
    body('inStock', 'Stock must not be empty').isInt().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            brand: req.body.brand,
            price: req.body.price,
            inStock: req.body.inStock,
            image: req.file.destination + req.file.filename,
            _id: req.params.id
        });
        console.log(errors);
        if (!errors.isEmpty()) {
            async.parallel({
                brands: function(callback) {
                    Brand.find(callback);
                },
                categories: function(callback) {
                    Category.find(callback)
                }
            }, function(err, results) {
                if (err) return next(err);
                res.render('product_detail', {
                    title: product.name, 
                    brands: results.brands,
                    categories: results.categories,
                    product: product,
                    errors: errors.array(),
                });
            });
            return;
        } else {
            //Data from form is valid
            Product.findByIdAndUpdate(req.params.id, product, {}, function (err, theProduct) {
                if (err) return next(err);

                res.redirect(theProduct.url);
            })
        }
    }
]