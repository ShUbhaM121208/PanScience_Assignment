// src/components/Navbar.jsx
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // New handler for TaskManager click
  const handleTaskManagerClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        {/* TaskManager button navigates based on auth state */}
        <button
          onClick={handleTaskManagerClick}
          className="text-xl font-bold text-blue-600 bg-transparent border-none cursor-pointer"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          TaskManager
        </button>
      </div>

      <nav className="flex items-center gap-6">
        {user ? (
          <>
            <span className="text-gray-700">Hello, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              Register
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
