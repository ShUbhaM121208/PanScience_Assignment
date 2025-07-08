// src/pages/CreateTask.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  dueDate: yup.date().required("Due date is required"),
  priority: yup.string().required("Priority is required"),
});

const CreateTask = () => {
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  // Handle file selection (only PDFs, max 3)
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    );

    if (validFiles.length > 3) {
      toast.error("You can only upload up to 3 PDF files.");
      return;
    }

    setFiles(validFiles);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("dueDate", data.dueDate);
    formData.append("priority", data.priority);

    files.forEach((file, i) => {
      formData.append("documents", file);
    });

    try {
      const res = await api.post("/tasks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Task created successfully!");
      console.log("Uploaded:", res.data);
    } catch (err) {
      toast.error("Task creation failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          placeholder="Task Title"
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.title?.message}</p>

        <textarea
          {...register("description")}
          placeholder="Task Description"
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.description?.message}</p>

        <input
          type="date"
          {...register("dueDate")}
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.dueDate?.message}</p>

        <select {...register("priority")} className="w-full px-3 py-2 border rounded">
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <p className="text-red-500 text-sm">{errors.priority?.message}</p>

        <div>
          <label className="block text-sm font-medium mb-1">Upload PDFs (max 3)</label>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full"
          />
          <div className="mt-2 text-sm text-gray-700">
            {files.map((file, index) => (
              <p key={index}>📄 {file.name}</p>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
