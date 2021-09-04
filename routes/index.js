var express = require('express');
var router = express.Router();
const multer = require('multer')

const brandController =  require('../controllers/brandController');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Surf' });
});


//BRAND ROUTES //
//GET for a single brand
router.get('/brand/:id', brandController.brandDetail);

//GET for all brands
router.get('/brands', brandController.brandList);


//CATEGORY ROUTES //
//GET for a single category
router.get('/category/:id', categoryController.categoryDetail);

//GET for all categories
router.get('/categories', categoryController.categoryList);


//PRODUCT ROUTES // 

//Get request for creating a product.
router.get('/product/create', productController.productCreateGet);

//Post request for creating a product
router.post('/product/create', upload.single('image'), productController.productCreatePost);

//Post request for deleting a product
router.post('/product/:id/delete', productController.productDeletePost);

//Post request for updating a product
router.post('/product/:id/update', upload.single('image'), productController.productUpdatePost);

//Get request for a single product
router.get('/product/:id', productController.productDetail);

//Get request for all products
router.get('/products', productController.productList);

module.exports = router;
