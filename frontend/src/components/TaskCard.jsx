// src/components/TaskCard.jsx
import { FaFilePdf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md space-y-2 border hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>

      <p className="text-sm text-gray-600 line-clamp-3">{task.description}</p>

      <div className="text-xs text-gray-500 flex flex-wrap gap-4 mt-2">
        <span>Status: <strong>{task.status}</strong></span>
        <span>Priority: <strong>{task.priority}</strong></span>
        <span>Due: <strong>{new Date(task.dueDate).toLocaleDateString()}</strong></span>
      </div>

      {task.documents && task.documents.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          {task.documents.map((doc, index) => (
            <a
              key={index}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 text-sm hover:underline"
            >
              <FaFilePdf className="mr-1" /> {doc.name || `Document ${index + 1}`}
            </a>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-between">
        <Link
          to={`/dashboard/tasks/${task._id}`}
          className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          View
        </Link>
        <Link
          to={`/dashboard/tasks/edit/${task._id}`}
          className="text-sm text-gray-700 hover:underline"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
