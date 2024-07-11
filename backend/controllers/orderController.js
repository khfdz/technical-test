// const Order = require('../models/orderModels');
// const dotenv = require('dotenv');

// dotenv.config()

// const getAllOrder = async (req, res) => {
//     try {
//         const orders = await Order.find();
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const getSingleOrder = async (req, res) => {
//     const userId = req.params.or_id;
//     try {
//         const order = await Order.findOne({ or_id: userId });
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const addOrder = async (req, res) => {
//     const { or_pd_id, or_amount } = req.body;   

//     try {
//         const newOrder = new Order({
//             or_pd_id,
//             or_amount
//         });

//         const order = await newOrder.save();
//         res.status(201).json(order);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };  

// const updateOrder = async (req, res) => {
//     const userId = req.params.or_id;
//     const { or_amount } = req.body; 

//     try {
//         const order = await Order.findOne({ or_id: userId });   

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         order.or_amount = or_amount;
//         await order.save();
//         res.status(200).json(order);

//     } catch (error) {

//         res.status(500).json({ message: error.message });
//     }
// };

// const deleteOrder = async (req, res) => {
//     const userId = req.params.or_id;

//     try {
//         const order = await Order.findOne({ or_id: userId });

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         await Order.deleteOne({ or_id: userId });

//         res.status(200).json({ message: 'Order deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// module.exports = { 
//     getAllOrder, 
//     getSingleOrder, 
//     addOrder, 
//     updateOrder,
//     deleteOrder
// }

// const Order = require('../models/orderModels');
// const Product = require('../models/productModels');
// const dotenv = require('dotenv');
// dotenv.config();

// const getAllOrder = async (req, res) => {
//     try {
//         const orders = await Order.find().populate('or_pd_id', 'pd_id pd_code pd_ct_id pd_name pd_price');
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const Order = require('../models/orderModels');
const Product = require('../models/productModels');

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: 'or_pd_id.pd_id',
            select: 'pd_id pd_code pd_ct_id pd_name pd_price',
            populate: {
                path: 'pd_ct_id',
                select: 'ct_id ct_name ct_code'
            }
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleOrder = async (req, res) => {
    const orderId = req.params.or_id;
    try {
        const order = await Order.findOne({ or_id: orderId }).populate({
            path: 'or_pd_id.pd_id',
            select: 'pd_id pd_code pd_ct_id pd_name pd_price',
            populate: {
                path: 'pd_ct_id',
                select: 'ct_id ct_name ct_code'
            }
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addOrder = async (req, res) => {
    const { order_products } = req.body;
    try {
        const products = await Product.find({
            pd_id: { $in: order_products.map(item => item.or_pd_id) }
        });
        if (products.length !== order_products.length) {
            return res.status(400).json({ message: 'One or more invalid product IDs' });
        }

        const orderItems = order_products.map(item => ({
            pd_id: products.find(product => product.pd_id === item.or_pd_id)._id,
            or_amount: item.or_amount
        }));

        const newOrder = new Order({
            or_pd_id: orderItems
        });

        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    const orderId = req.params.or_id;
    const { order_products } = req.body;

    try {
        const order = await Order.findOne({ or_id: orderId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const products = await Product.find({
            pd_id: { $in: order_products.map(item => item.or_pd_id) }
        });
        if (products.length !== order_products.length) {
            return res.status(400).json({ message: 'One or more invalid product IDs' });
        }

        const orderItems = order_products.map(item => ({
            pd_id: products.find(product => product.pd_id === item.or_pd_id)._id,
            or_amount: item.or_amount
        }));

        order.or_pd_id = orderItems;

        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.or_id;

    try {
        const order = await Order.findOne({ or_id: orderId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await Order.deleteOne({ or_id: orderId });

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllOrder,
    getSingleOrder,
    addOrder,
    updateOrder,
    deleteOrder
};
