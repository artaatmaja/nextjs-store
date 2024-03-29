const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    items: [{
        name: String,
        price: Number,
        amount: Number,
        description: String
    }]
})

module.exports = mongoose.models.Store || mongoose.model('Store', StoreSchema);