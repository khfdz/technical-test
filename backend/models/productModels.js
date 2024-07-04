const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    pd_id: {
        type: Number,
        unique: true,
    },
    pd_code: {
        type: String,
        required: true,
    },
    pd_ct_id: {
        type: Number,
        required: true,
    },
    pd_name: {
        type: String,
        required: true,
    },
    pd_price: {
        type: Number,
        required: true,
    },
    pd_created_at: {
        type: Date,
        default: Date.now,
    },
    pd_updated_at: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'Products' });

userSchema.plugin(AutoIncrement, { inc_field: 'pd_id' });

const Product = mongoose.model('Product', userSchema);

module.exports = Product;