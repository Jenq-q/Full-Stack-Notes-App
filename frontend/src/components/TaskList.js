"use client";
import { useState, useEffect } from "react";
import { taskAPI } from "../services/api";

export default function TaskList({ refreshTrigger }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      await taskAPI.updateTask(taskId, {
        ...task,
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    if (confirm("Delete this task?")) {
      try {
        await taskAPI.deleteTask(taskId);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      <h2>Tasks ({tasks.length})</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet!</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <div key={task.id}>
              <div>
                <div>
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                  <span>{task.status}</span>
                </div>

                <div>
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
