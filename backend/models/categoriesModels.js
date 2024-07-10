// const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// const categorySchema = new mongoose.Schema({
//     ct_id: {
//         type: Number,
//         unique: true,
//     },
//     ct_code: { 
//         type: String,
//         unique: true,
//     },
//     ct_name: {
//         type: String,
//         required: true,    
//     },
//     ct_created_at: {
//         type: Date,
//         default: Date.now,
//     },
//     ct_updated_at: {
//         type: Date,
//         default: Date.now,
//     },

// }, { collection: 'Categories' });

// categorySchema.plugin(AutoIncrement, { inc_field: 'ct_id' });

// categorySchema.pre('save', async function(next) {
//     if (this.isNew) {
//         try {
//             const lastCategory = await this.constructor.findOne({}, {}, { sort: { ct_id: -1 } });
//             const nextCtId = lastCategory ? lastCategory.ct_id + 1 : 1;
//             this.ct_id = nextCtId;

//             this.ct_code = `CT${nextCtId.toString().padStart(2, '0')}`;

//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

// const Category = mongoose.model('Category', categorySchema);

// module.exports = Category;

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new mongoose.Schema({
    ct_id: {
        type: Number,
        unique: true,
    },
    ct_code: { 
        type: String,
        unique: true,
    },
    ct_name: {
        type: String,
        required: true,    
    },
    ct_created_at: {
        type: Date,
        default: Date.now,
    },
    ct_updated_at: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'Categories' });

categorySchema.plugin(AutoIncrement, { inc_field: 'ct_id' });

categorySchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const lastCategory = await this.constructor.findOne({}, {}, { sort: { ct_id: -1 } });
            const nextCtId = lastCategory ? lastCategory.ct_id + 1 : 1;
            this.ct_id = nextCtId;

            this.ct_code = `CT${nextCtId.toString().padStart(2, '0')}`;

            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
