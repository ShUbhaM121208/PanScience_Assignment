// src/components/ToastProvider.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => (
  <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
);

export default ToastProvider;
