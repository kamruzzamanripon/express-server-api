const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController') 

//product routes
router.get('/all-product-without-pagination', ProductController.withOutPaginationAllProduct)
router.get('/all-product-with-pagination', ProductController.withPaginationAllProduct)
router.post('/create-product', ProductController.createProduct)
router.put('/update-product/:id', ProductController.updateProduct)
router.get('/single-product/:id', ProductController.singleProduct)
router.delete('/delete-product/:id', ProductController.deleteProduct)

module.exports = router;