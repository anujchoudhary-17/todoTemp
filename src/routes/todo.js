const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Create a new Todo
router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all Todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body; // Object containing updated fields
    const updatedTodo = await Todo.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a Todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndRemove(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
