const express = require ('express');
const router = express.Router();
const Contact = require('../models/Contact');


router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Save to database
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        res.status(200).send('Message stored successfully');

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
