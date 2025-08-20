"use client";
import { useState } from "react";
import { taskAPI } from "../services/api";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskAPI.createTask({ title, description, status: "pending" });
      setTitle("");
      setDescription("");
      onTaskAdded();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Add New Task</label>
      <input
        type="text"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description (optional)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="2"
      />

      <button type="submit">Add Task</button>
    </form>
  );
}
