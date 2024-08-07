const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleWare');
const { 
    registerUser, 
    loginUser, 
    findUser, 
    updateUser, 
    deleteUser,
    getAllUser
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:us_id', protect, findUser);
router.put('/user/:us_id', protect, updateUser);
router.delete('/user/:us_id', protect, deleteUser);
router.get('/user', protect, getAllUser);

module.exports = router;
