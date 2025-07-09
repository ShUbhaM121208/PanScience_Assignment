// src/pages/TaskDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const TaskDetails = () => {
  const { id } = useParams(); // task id from route
  const [task, setTask] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch task details
    api.get(`/tasks/${id}`).then(res => setTask(res.data));

    // Fetch attached files
    api.get(`/files/task/${id}`).then(res => setFiles(res.data));
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{task.title}</h2>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Priority: {task.priority}</p>

      <h3 className="mt-6 text-lg font-bold">Attached Documents</h3>
      {files.length === 0 ? (
        <p>No documents attached.</p>
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
