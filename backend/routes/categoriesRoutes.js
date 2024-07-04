const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleWare');
const { 
    getAllCategories, 
    getSingleCategories, 
    addCategories, 
    updateCategories, 
    deleteCategories 
} = require('../controllers/categoriesController');

router.get('/categories', getAllCategories);
router.get('/categories/:ct_id', getSingleCategories);
router.post('/categories', protect, addCategories);
router.put('/categories/:ct_id', protect, updateCategories);
router.delete('/categories/:ct_id', protect, deleteCategories);

module.exports = router;