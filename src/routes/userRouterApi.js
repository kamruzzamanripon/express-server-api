const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); 
const authMiddleware = require('../middleware/authMiddleware');
const fileUpload = require('../utils/fileUpload');

//User routes

router.post('/create-user', fileUpload('./storage/images/user'), UserController.createUser);
router.post('/login-user', UserController.loginUser);
router.get('/single-user-info/:id', authMiddleware, UserController.getInfoUser);
router.post('/single-user-update/:id', authMiddleware, fileUpload('./storage/images/user'), UserController.updateUserInfo);
router.delete('/single-user-delete/:id', authMiddleware, UserController.deleteUser);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/forgot-password/reset-password/:token', UserController.forgotResetPassword);



module.exports = router;