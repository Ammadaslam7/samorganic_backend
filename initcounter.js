// initCounter.js

const mongoose = require('mongoose');
const Counter = require('./models/Counter'); // Adjust the path to your Counter model

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ammadaslam07:5l6tx9DpOg9T0258@cluster0.3v9gofc.mongodb.net/samorganic?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const initCounter = async () => {
  try {
    const existingCounter = await Counter.findById('orderNumber');
    if (!existingCounter) {
      const counter = new Counter({ _id: 'orderNumber', seq: 0 });
      await counter.save();
      console.log('Counter initialized');
    } else {
      console.log('Counter already exists');
    }
  } catch (error) {
    console.error('Error initializing counter:', error);
  } finally {
    mongoose.connection.close();
  }
};

initCounter();
