const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    or_id: {
        type: Number,
        unique: true,
    },
    or_pd_id: {
        type: Number,
        required: true,
    },
    or_amount: {
        type: Number,
        required: true,
    },
    or_created_at: {
        type: Date,
        default: Date.now,
    },
    or_updated_at: {
        type: Date,
        default: Date.now,
    },

}, { collection: 'Orders' });

orderSchema.plugin(AutoIncrement, { inc_field: 'or_id' });

orderSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const lastOrder = await this.constructor.findOne({}, {}, { sort: { or_id: -1 } });
            const nextOrId = lastOrder ? lastOrder.or_id + 1 : 1;
            this.or_id = nextOrId;

            this.or_code = `OR${nextOrId.toString().padStart(4, '0')}`;

            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
