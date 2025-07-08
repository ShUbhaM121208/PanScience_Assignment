// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'My Tasks', to: '/dashboard/tasks' },
    { label: 'Create Task', to: '/dashboard/create' },
    { label: 'Profile', to: '/dashboard/profile' },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0 shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Menu
      </div>
      <ul className="mt-4">
        {menuItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `block px-6 py-3 hover:bg-gray-700 transition ${
                  isActive ? 'bg-gray-700' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
