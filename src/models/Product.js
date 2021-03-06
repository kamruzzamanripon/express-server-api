const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    sku: { 
        type: String, 
        required: false 
    },
    description: { 
        type: String, 
        required: false 
    },
    price: { 
        type: Number, 
        required: [true, 'Please enter Price'], 
    },
    size: { 
        type: String, 
        required: [true, 'Please enter Size'], 
    },
    manufacturingDate: { 
        type: Date, 
        required: [false, 'Please enter Manufacturing Date'], 
    },
    expiryDate: { 
        type: Date, 
        required: [false, 'Please enter Expiry Date'], 
    },
    images: { 
        type: Object, 
        required: [false, 'Please enter Expiry Date'], 
    },
},{ timestamps: true, versionKey:false })

DataSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', DataSchema, 'products');
module.exports = Product;

