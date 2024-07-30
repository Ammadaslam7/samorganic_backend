const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter'); // Adjust the path if needed

const OrderSchema = new Schema({
    orderNumber: { type: Number, unique: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    payment_method: { type: String, required: true },
    date: { type: Date, default: Date.now }
});


// Pre-save hook to auto-increment order number
OrderSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                'orderNumber',
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.orderNumber = counter.seq;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('Order', OrderSchema);

