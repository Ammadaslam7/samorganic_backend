const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// New review
router.post('/', async (req, res) => {
    try {
        const { name, email, rating, text } = req.body;
        if (!name || !email || !rating || !text) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newReview = new Review({ name, email, rating, text });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get all reviews that are accepted
router.get('/', async (req, res) => {
    try {
      const reviews = await Review.find({ approved: true });
      res.status(200).json(reviews);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  
// get all reviews regardless of approval status
router.get('/all', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update status of review
router.put('/:id/approve', async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
      res.status(200).json(review);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

module.exports = router;
