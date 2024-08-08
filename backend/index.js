const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Schedule = require('./models/Schedule');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/schedule';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/schedule', async (req, res) => {
  try {
    const schedule = await Schedule.find();
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).send(error);
  }
});

app.post('/schedule', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the incoming request body
    const newBlock = new Schedule(req.body);
    await newBlock.save();
    res.json(newBlock);
  } catch (error) {
    console.error('Error creating schedule:', error); // Log the error
    res.status(500).send(error);
  }
});

app.put('/schedule/:id', async (req, res) => {
  try {
    const updatedBlock = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBlock);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/schedule/:id', async (req, res) => {
  try {
    await Schedule.findOneAndDelete({ id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
