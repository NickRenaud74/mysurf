const express = require('express')
const router = express.Router();

const brandController = require('../controllers/brandController')

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

module.exports = router;