const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleWare');
const { 
    getAllOrder, 
    getSingleOrder, 
    addOrder, 
    updateOrder, 
    deleteOrder 
} = require('../controllers/orderController');

router.get('/orders', getAllOrder);
router.get('/orders/:or_id', getSingleOrder);
router.post('/orders', protect, addOrder);
router.put('/orders/:or_id', protect, updateOrder);
router.delete('/orders/:or_id', protect, deleteOrder);

module.exports = router;