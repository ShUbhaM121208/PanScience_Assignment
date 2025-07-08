# Task Manager – Frontend

A feature-rich, responsive, and scalable frontend for a full-stack Task Management application built with React, Redux Toolkit, and TailwindCSS. Includes real-time task updates, PDF uploads, and modern UI interactions.

---

## Features

- User Authentication (Login/Register)
- Task CRUD Interface
- Upload & View up to 3 PDFs per task
- Form validation with react-hook-form + yup
- Real-time task updates using Socket.io
- Routing with React Router DOM
- Global state via Redux Toolkit
- Clean, responsive UI using TailwindCSS
- Toast notifications for feedback
- Loading and error state handling

---

## Coding Practices Followed

- Modular File Structure: Pages, components, utils, routes, sockets, etc.
- Single Responsibility Principle for all components and logic
- Schema-based form validations using yup
- Reusable components like TaskCard, Navbar, Sidebar
- Controlled side effects via useEffect with cleanup
- Protected routes and extendable role-based routing
- Real-time integration using socket.io-client
- Toast notifications and user feedback via loading states

---

## Installation & Setup

### Prerequisites

- Node.js v16+
- npm or yarn
- Backend running on http://localhost:5000

### Setup

```bash
# Clone the repo
git clone https://github.com/your-username/task-manager-frontend.git
cd task-manager-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
