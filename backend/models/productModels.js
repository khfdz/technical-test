const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    pd_id: {
        type: Number,
        unique: true,
    },
    pd_code: {
        type: String,
        unique: true,
    },
    pd_ct_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Category'
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

productSchema.plugin(AutoIncrement, { inc_field: 'pd_id' });

productSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            if (!this.pd_id) {
                const lastProduct = await this.constructor.findOne({}, {}, { sort: { pd_id: -1 } });
                this.pd_id = lastProduct ? lastProduct.pd_id + 1 : 1;
            }
            this.pd_code = `PD${this.pd_id.toString().padStart(4, '0')}`;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
