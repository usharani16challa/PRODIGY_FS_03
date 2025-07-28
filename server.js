const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order=require('./models/Order');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Product schema
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/products', async (req, res) => {
    const { title, description, price, image } = req.body;
    const newProduct = new Product({ title, description, price, image });
    await newProduct.save();
    res.json({ message: 'Product added' });
});

app.post('/orders', async (req, res) => {
  const { name, address, items, total } = req.body;

  try {
    const order = new Order({ name, address, items, total });
    await order.save();
    res.json({ message: '✅ Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to place order', error });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));