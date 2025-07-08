// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Task Dashboard</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="font-semibold text-lg">Sample Task</h2>
          <p className="text-gray-600 text-sm mt-1">This is just a placeholder.</p>
          <button
            onClick={() => alert("View task")}
            className="mt-4 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
          >
            View Task
          </button>
        </div>
        {/* Add more task cards later */}
      </div>

      <button
        onClick={() => navigate("/login")}
        className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
