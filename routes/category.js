const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

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

module.exports = router;