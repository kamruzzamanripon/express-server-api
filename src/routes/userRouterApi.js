const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); 
const authMiddleware = require('../middleware/authMiddleware');
const {fileUpload, multerErrHandler} = require('../utils/fileUpload');

//User routes
router.get('/files/:name', UserController.download);
router.post('/create-user', fileUpload.single('photo'), multerErrHandler, UserController.createUser);
router.post('/login-user', UserController.loginUser);
router.get('/single-user-info/:id', authMiddleware, UserController.getInfoUser);
router.post('/single-user-update/:id', authMiddleware, fileUpload.single('photo'), multerErrHandler, UserController.updateUserInfo);
router.delete('/single-user-delete/:id', authMiddleware, UserController.deleteUser);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/forgot-password/reset-password/:token', UserController.forgotResetPassword);



module.exports = router;