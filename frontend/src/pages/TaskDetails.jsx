// src/pages/TaskDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const TaskDetails = () => {
  const { id } = useParams(); // task id from route
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Debug: Check if token exists
        const token = localStorage.getItem("token");
        console.log("🔍 Token check:", token ? "Token exists" : "No token found");
        
        // Fetch task details
        const taskRes = await api.get(`/tasks/${id}`);
        console.log("✅ Task fetched successfully:", taskRes.data);
        setTask(taskRes.data);

        // Fetch attached files
        try {
          const filesRes = await api.get(`/files/task/${id}`);
          console.log("✅ Files fetched successfully:", filesRes.data);
          setFiles(filesRes.data);
        } catch (fileError) {
          console.error("❌ Error fetching files:", fileError.response?.data || fileError.message);
          setFiles([]);
        }
        
      } catch (err) {
        console.error("❌ Error fetching task:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch task");
        
        if (err.response?.status === 403) {
          toast.error("You don't have permission to view this task");
        } else if (err.response?.status === 404) {
          toast.error("Task not found");
          navigate("/dashboard");
        } else {
          toast.error("Failed to load task details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  
  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10 bg-red-50 p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-red-800 mb-4">Error</h2>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!task) return <div className="text-center mt-10">Task not found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{task.title}</h2>
      <p className="mb-4">{task.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <span className="font-semibold">Due Date:</span> {new Date(task.dueDate).toLocaleDateString()}
        </div>
        <div>
          <span className="font-semibold">Priority:</span> {task.priority}
        </div>
        <div>
          <span className="font-semibold">Status:</span> {task.status}
        </div>
      </div>

      <h3 className="mt-6 text-lg font-bold">Attached Documents</h3>
      {files.length === 0 ? (
        <p className="text-gray-500">No documents attached.</p>
      ) : (
        <ul className="list-disc ml-6">
          {files.map(file => (
            <li key={file._id}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
                download
              >
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskDetails;
