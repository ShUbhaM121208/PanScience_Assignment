// src/App.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ToastProvider from './components/ToastProvider';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-4">
        <Outlet /> {/* This renders nested pages like Login, Register, Dashboard */}
      </main>
      <ToastProvider />
    </div>
  );
};

export default App;
