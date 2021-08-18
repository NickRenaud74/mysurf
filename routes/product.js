const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

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