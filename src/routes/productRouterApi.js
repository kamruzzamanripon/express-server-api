const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController') 
const authMiddleware = require('../middleware/authMiddleware');
const multipleFileUpload = require('../utils/multipleFileUpload');




//product routes
router.get('/all-product-without-pagination', ProductController.withOutPaginationAllProduct);
router.get('/all-product-with-pagination', ProductController.withPaginationAllProduct);
router.post('/create-product', authMiddleware, multipleFileUpload('./storage/images/products'), ProductController.createProduct);
router.post('/update-product/:id', authMiddleware, multipleFileUpload('./storage/images/products'), ProductController.updateProduct);
router.get('/single-product/:id', authMiddleware, ProductController.singleProduct);
router.delete('/delete-product/:id', authMiddleware, ProductController.deleteProduct);

module.exports = router;