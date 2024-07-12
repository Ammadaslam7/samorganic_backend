const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ammadaslam07:psTC4HJulpWy6a4B@cluster0.2byxz3d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
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

