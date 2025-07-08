// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";

const sampleTasks = [
  {
    _id: "1",
    title: "Design Landing Page",
    description: "Build a responsive landing page for the marketing website.",
    status: "In Progress",
    priority: "High",
    dueDate: "2025-07-10",
    documents: [],
  },
  {
    _id: "2",
    title: "Setup CI/CD",
    description: "Configure GitHub Actions for automatic deployment.",
    status: "Pending",
    priority: "Medium",
    dueDate: "2025-07-12",
    documents: [],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

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
        {sampleTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
