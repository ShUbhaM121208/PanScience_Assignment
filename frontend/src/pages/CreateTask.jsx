// src/pages/CreateTask.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().min(10).required("Description is too short"),
  dueDate: yup.date().required("Due date is required"),
  priority: yup.string().required("Priority is required"),
});

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Create task:", data);
    // TODO: Send task to backend API
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
