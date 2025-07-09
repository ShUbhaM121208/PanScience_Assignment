# Task Management API

A Node.js/Express REST API for task management with user authentication, file uploads, and real-time features.

## Features

- User authentication with JWT
- Task CRUD operations
- File upload to AWS S3
- Role-based access control (User/Admin)
- Real-time updates with Socket.IO
- MongoDB database integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer + AWS S3
- **Real-time**: Socket.IO
- **Password Hashing**: bcryptjs

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js   # User authentication
│   ├── taskController.js   # Task operations
│   ├── fileController.js   # File uploads
│   └── userController.js   # User management
├── middlewares/
│   ├── authMiddleware.js   # JWT authentication
│   ├── roleMiddleware.js   # Role-based access
│   └── multerConfig.js    # File upload config
├── models/
│   ├── user.js            # User schema
│   ├── task.js            # Task schema
│   ├── file.js            # File schema
│   └── index.js           # Model exports
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── taskRoutes.js      # Task routes
│   ├── fileRoutes.js      # File routes
│   └── userRoutes.js      # User routes
├── utils/
│   ├── jwt.js             # JWT utilities
│   └── s3Client.js        # AWS S3 client
├── app.js                 # Express app setup
├── server.js              # Server entry point
└── package.json
```

## Installation

1. Clone the repository
2. Navigate to backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create environment variables:
   ```bash
   # Create .env file
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   JWT_SECRET=your_super_secret_jwt_key_here
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_BUCKET_NAME=your_s3_bucket_name
   PORT=5003
   ```

5. Start the server:
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get user's tasks
- `GET /api/tasks/all` - Get all tasks (admin only)
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Files
- `POST /api/files/upload` - Upload file to S3
- `GET /api/files/task/:taskId` - Get files for task

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `AWS_REGION` | AWS region for S3 | Yes |
| `AWS_ACCESS_KEY_ID` | AWS access key | Yes |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | Yes |
| `AWS_BUCKET_NAME` | S3 bucket name | Yes |
| `PORT` | Server port (default: 5003) | No |

## Database Models

### User
- `name` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `role` (String, enum: ['user', 'admin'], default: 'user')

### Task
- `title` (String, required)
- `description` (String)
- `status` (String, default: 'pending')
- `priority` (String, default: 'normal')
- `dueDate` (Date)
- `userId` (ObjectId, ref: 'User', required)

### File
- `name` (String)
- `url` (String, S3 URL)
- `mimetype` (String)
- `size` (Number)
- `taskId` (ObjectId, ref: 'Task')
- `userId` (ObjectId, ref: 'User')

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Authorization

- **Users**: Can only access their own tasks and files
- **Admins**: Can access all tasks, files, and users
- **Protected Routes**: Require valid JWT token
- **Role-based Routes**: Some routes require admin role

## File Upload

Files are uploaded to AWS S3 with the following configuration:
- Maximum file size: 10MB
- Allowed formats: PDF only
- Storage: AWS S3 bucket
- URL format: `https://bucket.s3.region.amazonaws.com/uploads/filename`

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running in Production Mode
```bash
npm start
```

### Testing API Endpoints
Use tools like Postman or curl to test the endpoints:

```bash
# Login
curl -X POST http://localhost:5003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Get tasks (with token)
curl -X GET http://localhost:5003/api/tasks \
  -H "Authorization: Bearer <your_token>"
```

## Dependencies

### Production Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-origin resource sharing
- `morgan` - HTTP request logger
- `multer` - File upload middleware
- `@aws-sdk/client-s3` - AWS S3 client
- `@aws-sdk/lib-storage` - AWS S3 upload
- `socket.io` - Real-time communication

### Development Dependencies
- `nodemon` - Auto-restart on file changes

## License

This project is licensed under the ISC License. 