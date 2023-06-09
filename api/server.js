const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/mern-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.log(err));

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todos/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text,
    });
    todo.save();

    res.json(todo);
});

app.delete('/todos/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});

app.get('/todos/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (todo.complete === true) {
        todo.complete = false;
    } else {
        todo.complete = true;
    }

    todo.save();

    res.json(todo);
});

app.put('/todos/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});


app.listen(3000, () => {
    console.log('Server has started on port 3000!');
});
