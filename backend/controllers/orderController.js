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
            select: '-_id pd_id pd_code pd_ct_id pd_name pd_price pd_created_at pd_updated_at',
            populate: {
                path: 'pd_ct_id',
                select: '-_id ct_id ct_name ct_code'
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
            select: '-_id pd_id pd_code pd_ct_id pd_name pd_price pd_created_at pd_updated_at',
            populate: {
                path: 'pd_ct_id',
                select: '-_id ct_id ct_name ct_code'
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
    const { or_pd_id } = req.body;
    try {
        const products = await Product.find({
            pd_id: { $in: or_pd_id.map(item => item.pd_id) }
        });
        if (products.length !== or_pd_id.length) {
            return res.status(400).json({ message: 'One or more invalid product IDs' });
        }

        const orderItems = or_pd_id.map(item => ({
            pd_id: products.find(product => product.pd_id === item.pd_id)._id,
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
    const { or_pd_id } = req.body;

    try {
        const order = await Order.findOne({ or_id: orderId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const products = await Product.find({
            pd_id: { $in: or_pd_id.map(item => item.pd_id) }
        });
        if (products.length !== or_pd_id.length) {
            return res.status(400).json({ message: 'One or more invalid product IDs' });
        }

        const orderItems = or_pd_id.map(item => ({
            pd_id: products.find(product => product.pd_id === item.pd_id)._id,
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
