import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection URI (use your own MongoDB URI here)
const mongoURI = 'yourKluster'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Create a schema for the pizzas
const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  url: { type: String, required: true }
});

// Create a model for the pizzas collection
const Pizza = mongoose.model('Pizza', pizzaSchema);

// CRUD routes for pizzas

// 1. Create a pizza
app.post('/pizzas', async (req, res) => {
  const { name, price, url } = req.body;
  try {
    const newPizza = new Pizza({ name, price, url });
    await newPizza.save();
    res.status(201).json(newPizza);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Get all pizzas
app.get('/pizzas', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json(pizzas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Get a pizza by ID
app.get('/pizzas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pizza = await Pizza.findById(id);
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza not found' });
    }
    res.status(200).json(pizza);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Update a pizza by ID
app.put('/pizzas/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, url } = req.body;
  try {
    const updatedPizza = await Pizza.findByIdAndUpdate(
      id,
      { name, price, url },
      { new: true }
    );
    if (!updatedPizza) {
      return res.status(404).json({ error: 'Pizza not found' });
    }
    res.status(200).json(updatedPizza);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Delete a pizza by ID
app.delete('/pizzas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPizza = await Pizza.findByIdAndDelete(id);
    if (!deletedPizza) {
      return res.status(404).json({ error: 'Pizza not found' });
    }
    res.status(200).json({ message: 'Pizza deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
