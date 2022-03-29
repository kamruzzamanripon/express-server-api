const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController') 
const UserController = require('../controllers/UserController'); 
const authMiddleware = require('../middleware/authMiddleware');

//User routes
router.post('/create-user', UserController.createUser);
router.post('/login-user', UserController.loginUser);
router.get('/single-user-info/:id', authMiddleware, UserController.getInfoUser);
router.post('/single-user-update/:id', authMiddleware, UserController.updateUserInfo);
router.delete('/single-user-delete/:id', authMiddleware, UserController.deleteUser);


//product routes
router.get('/all-product-without-pagination', ProductController.withOutPaginationAllProduct);
router.get('/all-product-with-pagination', ProductController.withPaginationAllProduct);
router.post('/create-product', authMiddleware, ProductController.createProduct);
router.put('/update-product/:id', authMiddleware, ProductController.updateProduct);
router.get('/single-product/:id', authMiddleware, ProductController.singleProduct);
router.delete('/delete-product/:id', authMiddleware, ProductController.deleteProduct);

module.exports = router;