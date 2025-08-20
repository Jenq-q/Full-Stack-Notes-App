const Task = require("../models/Task");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tasks = await Task.getById(req.params.id);
    if (!tasks) {
      return res.status(404).json({ error: "task not fount" });
    }
    res.json(tasks);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await Task.createTask(title, description, status);
    res.status(201).json(task);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { title, description, status } = req.body;
  const id = req.params.id;
  try {
    const task = await Task.updateTask(id, title, description, status);
    res.status(201).json(task);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = Task.deleteTask(id);
    res.status(204).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
