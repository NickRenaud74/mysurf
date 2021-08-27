const Category = require('../models/category')
const Product = require('../models/product')
const async = require('async')

//Display list of all categories on GET
exports.categoryList = (req, res, next) => {
    Category.find()
        .sort([['name', 'ascending']])
        .exec((err, listCategories) => {
            if (err) return next(err);

            res.render('item_list', {title: 'All Categories', list: listCategories})
        })
};

//Display single category detail page on GET
exports.categoryDetail = (req, res, next) =>  {

    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).exec(callback);
        },
        categoryProducts: function(callback) {
            Product.find({'category': req.params.id}).exec(callback)
        }
    }, (err, results) => {
        if (err) return next(err);
        if(results.category === null) {
            let err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('category_detail', {
            title: results.category.name, 
            category: results.category,
            categoryProducts: results.categoryProducts
        })
    })
};

//Display category create form on GET
exports.categoryCreateGet = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: category create GET')
};

//Handle category create on POST
exports.categoryCreatePost = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: category create POST')
};

//Display category delete form on GET
exports.categoryDeleteGet = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: category delete GET')
};

//Handle category delete on POST
exports.categoryDeletePost = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: category delete POST')
};

//Display category update form on GET
exports.categoryUpdateGet = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: category update GET')
};

//Handle category update on POST
exports.categoryUpdatePost = (req, res, next) => {
    res.send('NOT IMPLEMENTED YET: category update POST')
};