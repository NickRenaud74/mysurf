var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Surf' });
});

//BRAND ROUTES //

//Get request for creating a brand.
router.get('/brand/create', brandController.brandCreateGet);

//Post request for creating a brand
router.post('/brand/create', brandController.brandCreatePost);

//Get request for deleting a brand
router.get('/brand/:id/delete', brandController.brandDeleteGet);

//Post request for deleting a brand
router.post('/brand/:id/delete', brandController.brandDeletePost);

//Get request for updating a brand
router.get('/brand/:id/update', brandController.brandUpdateGet);

//Post request for updating a brand
router.get('/brand/:id/update', brandController.brandUpdatePost);

//Get request for a single brand
router.get('/brand/:id', brandController.brandDetail);

//Get request for all brands
router.get('/brands', brandController.brandList);


//CATEGORY ROUTES //

//Get request for creating a category.
router.get('/category/create', categoryController.categoryCreateGet);

//Post request for creating a category
router.post('/category/create', categoryController.categoryCreatePost);

//Get request for deleting a category
router.get('/category/:id/delete', categoryController.categoryDeleteGet);

//Post request for deleting a category
router.post('/category/:id/delete', categoryController.categoryDeletePost);

//Get request for updating a category
router.get('/category/:id/update', categoryController.categoryUpdateGet);

//Post request for updating a category
router.get('/category/:id/update', categoryController.categoryUpdatePost);

//Get request for a single category
router.get('/category/:id', categoryController.categoryDetail);

//Get request for all categorys
router.get('/categories', categoryController.categoryList);


//PRODUCT ROUTES // 

//Get request for creating a product.
router.get('/product/create', productController.productCreateGet);

//Post request for creating a product
router.post('/product/create', productController.productCreatePost);

//Get request for deleting a product
router.get('/product/:id/delete', productController.productDeleteGet);

//Post request for deleting a product
router.post('/product/:id/delete', productController.productDeletePost);

//Get request for updating a product
router.get('/product/:id/update', productController.productUpdateGet);

//Post request for updating a product
router.get('/product/:id/update', productController.productUpdatePost);

//Get request for a single product
router.get('/product/:id', productController.productDetail);

//Get request for all products
router.get('/products', productController.productList);

module.exports = router;
