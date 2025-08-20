"use client";
import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Task Manager
        </h1>

        <TaskForm onTaskAdded={handleTaskAdded} />
        <TaskList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
