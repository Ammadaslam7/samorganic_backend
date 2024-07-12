const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.port || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/samorganic', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');
const contactRoute = require('./routes/contacts');
const couponRoute = require('./routes/coupons');

    
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoute);
app.use('/api/coupons', couponRoute);
    

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

