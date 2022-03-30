const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController') 
const authMiddleware = require('../middleware/authMiddleware');




//product routes
router.get('/all-product-without-pagination', ProductController.withOutPaginationAllProduct);
router.get('/all-product-with-pagination', ProductController.withPaginationAllProduct);
router.post('/create-product', authMiddleware, ProductController.createProduct);
router.put('/update-product/:id', authMiddleware, ProductController.updateProduct);
router.get('/single-product/:id', authMiddleware, ProductController.singleProduct);
router.delete('/delete-product/:id', authMiddleware, ProductController.deleteProduct);

module.exports = router;