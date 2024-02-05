require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/Samples');
mongoose.connect(process.env.MONGO_URI);

// Define MongoDB schema
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  message: String
});

// Create a MongoDB model
const Customer = mongoose.model('Customer', customerSchema);

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (optional)
app.use(express.static('public'));

// Route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    // Create a new customer instance
    const newCustomer = new Customer(req.body);

    // Save the customer data to MongoDB
    await newCustomer.save();

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
