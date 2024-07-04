const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleWare');
const { 
    getAllProduct, 
    getSingleProduct, 
    addProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');

router.get('/product', getAllProduct);
router.get('/product/:pd_id', getSingleProduct);
router.post('/product', protect, addProduct);
router.put('/product/:pd_id', protect, updateProduct);
router.delete('/product/:pd_id', protect, deleteProduct);

module.exports = router;