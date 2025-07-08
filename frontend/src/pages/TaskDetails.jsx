// src/pages/TaskDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        toast.error("Failed to fetch task details");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <div className="p-6">Loading task...</div>;

  if (!task) return <div className="p-6 text-red-500">Task not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="flex gap-6 text-sm text-gray-700 mb-4">
        <span>Status: <strong>{task.status}</strong></span>
        <span>Priority: <strong>{task.priority}</strong></span>
        <span>Due: <strong>{new Date(task.dueDate).toLocaleDateString()}</strong></span>
      </div>

      {task.documents?.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold mb-2">Attached Documents:</h2>

          {task.documents.map((doc, index) => (
            <div key={index} className="border rounded overflow-hidden shadow">
              <div className="bg-gray-100 px-4 py-2 text-sm font-medium">
                {doc.name || `Document ${index + 1}`}
              </div>
              <embed
                src={doc.url}
                type="application/pdf"
                className="w-full h-96"
              />
              {/* Alternatively: 
                <iframe src={doc.url} className="w-full h-96" title={`PDF-${index}`}></iframe> 
              */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
