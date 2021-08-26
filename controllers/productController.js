const Product = require('../models/product')

//Display list of all products on GET
exports.productList = (req, res, next) => {
    Product.find()
        .populate('brand')
        .populate('category')
        .exec((err, list_product) => {
            if(err) return next(err);
            console.log(list_product);
            res.render('product_list', {title: 'All Products', product_list: list_product})
        })
};

//Display single product detail page on GET
exports.productDetail = (req, res, next) =>  {
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
            res.render('product_detail', {title: product.name, product: product})
        })
};

//Display product create form on GET
exports.productCreateGet = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: product create GET')
};

//Handle product create on POST
exports.productCreatePost = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: product create POST')
};

//Display product delete form on GET
exports.productDeleteGet = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: product delete GET')
};

//Handle product delete on POST
exports.productDeletePost = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: product delete POST')
};

//Display product update form on GET
exports.productUpdateGet = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: product update GET')
};

//Handle product update on POST
exports.productUpdatePost = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: product update POST')
};