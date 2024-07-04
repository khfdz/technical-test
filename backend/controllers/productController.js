const Product = require('../models/productModels');
const Category = require('../models/categoriesModels');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleProduct = async (req, res) => {
    const userId = req.params.pd_id;
    try {
        const product = await Product.findOne({ pd_id: userId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addProduct = async (req, res) => {
    const { pd_name, pd_price, pd_ct_id } = req.body;

    try {
        const category = await Category.findOne({ ct_id: pd_ct_id });
        if (!category) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const newProduct = new Product({
            pd_name,
            pd_price,
            pd_ct_id: category.ct_id,
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const userId = req.params.pd_id;
    const { pd_code, pd_name, pd_price, pd_ct_id } = req.body;

    try {
        const product = await Product.findOne({ pd_id: userId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const category = await Category.findOne({ ct_id: pd_ct_id });
        if (!category) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        product.pd_code = pd_code;
        product.pd_name = pd_name;
        product.pd_price = pd_price;
        product.pd_ct_id = category.ct_id; 

        await product.save();

        res.status(200).json({ message: 'Product UPDATED successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const userId = req.params.pd_id;

    try {
        const product = await Product.findOne({ pd_id: userId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.deleteOne({ pd_id: userId });

        res.status(200).json({ message: 'Product DELETED successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProduct,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct
};
