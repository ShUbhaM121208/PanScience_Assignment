// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import api from "../utils/api";
import { socket } from '../sockets/soket';
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();           // Initial fetch
    socket.connect();       // Connect to WebSocket server

    // Handle task creation event
    socket.on("task_created", (newTask) => {
      setTasks((prev) => [newTask, ...prev]);
      toast.success("A new task was added!");
    });

    // Handle task update event
    socket.on("task_updated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      toast.info("A task was updated.");
    });

    return () => {
      socket.disconnect(); // Clean up on unmount
      socket.off("task_created");
      socket.off("task_updated");
    };
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <button
          onClick={() => navigate("/dashboard/create")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create Task
        </button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
