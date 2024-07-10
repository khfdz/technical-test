const Product = require('../models/productModels');
const Category = require('../models/categoriesModels');
const dotenv = require('dotenv');
dotenv.config();

const getAllProduct = async (req, res) => {
    try {
        let products = await Product.find().populate('pd_ct_id', 'ct_id ct_name ct_code');
        products = products.map(product => {
            const productObj = product.toObject();
            productObj.pd_ct_id = {
                ct_id: product.pd_ct_id.ct_id,
                ct_name: product.pd_ct_id.ct_name,
                ct_code: product.pd_ct_id.ct_code,
            };
            return productObj;
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleProduct = async (req, res) => {
    const productId = req.params.pd_id;
    try {
        let product = await Product.findOne({ pd_id: productId }).populate('pd_ct_id', 'ct_id ct_name ct_code');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product = product.toObject();
        product.pd_ct_id = {
            ct_id: product.pd_ct_id.ct_id,
            ct_name: product.pd_ct_id.ct_name,
            ct_code: product.pd_ct_id.ct_code,
        };
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
            pd_ct_id: category._id,
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updateProduct = async (req, res) => {
    const productId = req.params.pd_id;
    const { pd_name, pd_price, pd_ct_id } = req.body;

    try {
        let product = await Product.findOne({ pd_id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const category = await Category.findOne({ ct_id: pd_ct_id });
        if (!category) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        product.pd_name = pd_name || product.pd_name;
        product.pd_price = pd_price || product.pd_price;
        product.pd_ct_id = category._id || product.pd_ct_id;

        await product.save();

        res.status(200).json({ message: 'Product UPDATED successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.pd_id;

    try {
        const product = await Product.findOne({ pd_id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.deleteOne({ pd_id: productId });

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
