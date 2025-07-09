# Task Management Frontend

A React-based frontend application for task management with user authentication, real-time updates, and file upload capabilities.

## Features

- User authentication and registration
- Task creation, editing, and deletion
- File upload and attachment management
- Real-time task updates with Socket.IO
- Responsive design with Tailwind CSS
- Role-based access control (User/Admin)
- Toast notifications for user feedback
- Form validation with React Hook Form

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Yup
- **Real-time**: Socket.IO Client
- **Notifications**: React Toastify
- **Icons**: React Icons

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   └── store.js              # Redux store configuration
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation component
│   │   ├── Sidebar.jsx           # Sidebar navigation
│   │   ├── TaskCard.jsx          # Task display component
│   │   └── ToastProvider.jsx     # Toast notifications
│   ├── features/
│   │   ├── auth/
│   │   │   └── authSlice.js      # Authentication state
│   │   └── tasks/
│   │       └── taskSlice.js      # Task state management
│   ├── pages/
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── Dashboard.jsx         # Main dashboard
│   │   ├── CreateTask.jsx        # Task creation
│   │   └── TaskDetails.jsx       # Task details view
│   ├── routes/
│   │   ├── AppRoutes.jsx         # Route configuration
│   │   └── PrivateRoute.jsx      # Protected route wrapper
│   ├── sockets/
│   │   └── socket.js             # Socket.IO client
│   ├── utils/
│   │   └── api.js                # API configuration
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles
├── public/
│   └── vite.svg                  # Vite logo
├── package.json
├── vite.config.js
└── index.html
```

## Installation

1. Clone the repository
2. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## Prerequisites

Before running the frontend, ensure the backend server is running:

```bash
# In a separate terminal, start the backend
cd backend
npm install
npm run dev
```

The backend should be running on `http://localhost:5003`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Configuration

The frontend communicates with the backend API. The API configuration is in `src/utils/api.js`:

```javascript
const api = axios.create({
  baseURL: "http://localhost:5003/api",
  headers: {
    "Content-Type": "application/json",
  },
});
```

## State Management

The application uses Redux Toolkit for state management:

### Auth Slice (`features/auth/authSlice.js`)
- User authentication state
- Login/logout actions
- User profile management

### Task Slice (`features/tasks/taskSlice.js`)
- Task CRUD operations
- Task filtering and sorting
- Real-time task updates

## Routing

The application uses React Router for navigation:

- `/login` - User login page
- `/register` - User registration page
- `/dashboard` - Main dashboard (protected)
- `/create-task` - Task creation (protected)
- `/task/:id` - Task details (protected)

## Components

### Core Components
- **Navbar**: Main navigation with user menu
- **Sidebar**: Side navigation for task management
- **TaskCard**: Individual task display component
- **ToastProvider**: Notification system wrapper

### Pages
- **Login**: User authentication
- **Register**: User registration
- **Dashboard**: Main task management interface
- **CreateTask**: Task creation form
- **TaskDetails**: Detailed task view

## Authentication

The application implements JWT-based authentication:

1. **Login**: User enters credentials, receives JWT token
2. **Token Storage**: Token stored in localStorage
3. **Protected Routes**: Routes require valid authentication
4. **Auto-logout**: Token expiration handling

## File Upload

The application supports file uploads with the following features:

- Drag and drop interface
- File type validation (PDF only)
- Progress indicators
- File preview and download
- AWS S3 integration

## Real-time Features

Socket.IO integration provides real-time updates:

- Task creation notifications
- Task status updates
- User activity tracking
- Live collaboration features

## Styling

The application uses Tailwind CSS for styling:

- Responsive design
- Dark/light mode support
- Custom component styling
- Utility-first approach

## Form Validation

React Hook Form with Yup validation:

- Real-time validation
- Error message display
- Form submission handling
- Field-level validation

## Error Handling

Comprehensive error handling throughout the application:

- API error responses
- Network connectivity issues
- User-friendly error messages
- Toast notifications for feedback

## Development

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Code Linting
```bash
npm run lint
```

## Environment Variables

The frontend can be configured with environment variables:

```env
VITE_API_URL=http://localhost:5003/api
VITE_SOCKET_URL=http://localhost:5003
```

## Dependencies

### Core Dependencies
- `react` - UI library
- `react-dom` - DOM rendering
- `react-router-dom` - Routing
- `@reduxjs/toolkit` - State management
- `react-redux` - React-Redux integration
- `axios` - HTTP client

### UI Dependencies
- `tailwindcss` - CSS framework
- `react-icons` - Icon library
- `react-toastify` - Notifications

### Form Dependencies
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation
- `yup` - Schema validation

### Real-time Dependencies
- `socket.io-client` - Real-time communication

### Development Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin
- `eslint` - Code linting
- `@types/react` - TypeScript types

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting with React Router
- Lazy loading of components
- Optimized bundle size with Vite
- Efficient state management with Redux Toolkit

## Security

- JWT token authentication
- Protected route implementation
- Input validation and sanitization
- Secure API communication

## License

This project is licensed under the ISC License.
