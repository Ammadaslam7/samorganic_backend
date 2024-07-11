// models/coupon.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Coupon', CouponSchema);
