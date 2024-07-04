const Order = require('../models/orderModels');
const dotenv = require('dotenv');

dotenv.config()

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleOrder = async (req, res) => {
    const userId = req.params.or_id;
    try {
        const order = await Order.findOne({ or_id: userId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addOrder = async (req, res) => {
    const { or_pd_id, or_amount } = req.body;   

    try {
        const newOrder = new Order({
            or_pd_id,
            or_amount
        });

        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

const updateOrder = async (req, res) => {
    const userId = req.params.or_id;
    const { or_amount } = req.body; 

    try {
        const order = await Order.findOne({ or_id: userId });   

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.or_amount = or_amount;
        await order.save();
        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    const userId = req.params.or_id;

    try {
        const order = await Order.findOne({ or_id: userId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await Order.deleteOne({ or_id: userId });

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
}