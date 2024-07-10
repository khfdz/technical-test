// const Categories = require('../models/categoriesModels');
// const dotenv = require('dotenv');

// dotenv.config()

// const getAllCategories = async (req, res) => {
//     try {
//         const categories = await Categories.find();
//         res.status(200).json(categories);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const getSingleCategories = async (req, res) => {
//     const userId = req.params.ct_id;
//     try {
//         const category = await Categories.findOne({ ct_id: userId });
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found' });
//         }
//         res.status(200).json(category);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const addCategories = async (req, res) => {
//     const { ct_id, ct_code, ct_name } = req.body;

//     try {
//         const newCategories = new Categories({
//             ct_id,
//             ct_code,
//             ct_name
//         });

//         const category = await newCategories.save();
//         res.status(201).json(category);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const updateCategories = async (req, res) => {
//     const userId = req.params.ct_id;
//     const { ct_code, ct_name } = req.body;  

//     try {
//         const category = await Categories.findOne({ ct_id: userId });

//         if (!category) {
//             return res.status(404).json({ message: 'Category not found' });
//         }

//         category.ct_code = ct_code;
//         category.ct_name = ct_name;

//         await category.save();

//         res.status(200).json({ message: 'Category UPDATED successfully', category });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const deleteCategories = async (req, res) => {
//     const userId = req.params.ct_id;    

//     try {
//         const category = await Categories.findOne({ ct_id: userId });       

//         if (!category) {
//             return res.status(404).json({ message: 'Category not found' });
//         }

//         await Categories.deleteOne({ ct_id: userId });

//         res.status(200).json({ message: 'Category DELETED successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = { 
//     getAllCategories, 
//     getSingleCategories, 
//     addCategories, 
//     updateCategories, 
//     deleteCategories }

const Category = require('../models/categoriesModels');
const dotenv = require('dotenv');
dotenv.config();

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleCategories = async (req, res) => {
    const categoryId = req.params.ct_id;
    try {
        const category = await Category.findOne({ ct_id: categoryId });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCategories = async (req, res) => {
    const { ct_name } = req.body;

    try {
        const newCategory = new Category({
            ct_name
        });

        const category = await newCategory.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategories = async (req, res) => {
    const categoryId = req.params.ct_id;
    const { ct_code, ct_name } = req.body;

    try {
        const category = await Category.findOne({ ct_id: categoryId });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.ct_code = ct_code;
        category.ct_name = ct_name;

        await category.save();

        res.status(200).json({ message: 'Category UPDATED successfully', category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategories = async (req, res) => {
    const categoryId = req.params.ct_id;

    try {
        const category = await Category.findOne({ ct_id: categoryId });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await Category.deleteOne({ ct_id: categoryId });

        res.status(200).json({ message: 'Category DELETED successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCategories,
    getSingleCategories,
    addCategories,
    updateCategories,
    deleteCategories
};
