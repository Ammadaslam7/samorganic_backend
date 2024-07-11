// routes/coupons.js
const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');


// routes/coupons.js
router.get('/:code', async (req, res) => {
    const { code } = req.params;

    try {
        const coupon = await Coupon.findOne({ code });
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.json({ discount: coupon.discount });
    } catch (error) {
        console.error('Error fetching coupon:', error);
        res.status(500).send('Server error');
    }
});


// GET all coupons
router.get('/', async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        console.error('Error fetching coupons:', error);
        res.status(500).send('Server error');
    }
});

// POST create a new coupon
router.post('/', async (req, res) => {
    const { code, discount } = req.body;

    try {
        const newCoupon = new Coupon({ code, discount });
        await newCoupon.save();
        res.status(200).send('Coupon created successfully');
    } catch (error) {
        console.error('Error creating coupon:', error);
        res.status(500).send('Server error');
    }
});

// PUT update a coupon by ID
router.put('/:id', async (req, res) => {
    const { code, discount } = req.body;
    const couponId = req.params.id;

    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, { code, discount }, { new: true });
        res.json(updatedCoupon);
    } catch (error) {
        console.error('Error updating coupon:', error);
        res.status(500).send('Server error');
    }
});

// DELETE a coupon by ID
router.delete('/:id', async (req, res) => {
    const couponId = req.params.id;

    try {
        await Coupon.findByIdAndDelete(couponId);
        res.status(200).send('Coupon deleted successfully');
    } catch (error) {
        console.error('Error deleting coupon:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
