const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
});

const Task = mongoose.model('Task', taskSchema);

app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    console.log('Saved task:', task);
    res.json(task);
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log('Fetched tasks:', tasks);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/tasks/:id', async (req, res) => {
  try {
    console.log(`Fetching task with ID: ${req.params.id}`);
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    console.log('Fetched task:', task);
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
