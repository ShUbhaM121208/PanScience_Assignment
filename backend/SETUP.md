# Backend Setup Guide

## Environment Variables Required

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_BUCKET_NAME=your_s3_bucket_name

# Server Configuration
PORT=5003
```

## Docker Setup

Update the `docker-compose.yml` file with your actual values:

```yaml
environment:
  - MONGO_URI=your_actual_mongodb_connection_string
  - JWT_SECRET=your_actual_jwt_secret
  - AWS_REGION=your_aws_region
  - AWS_ACCESS_KEY_ID=your_aws_access_key_id
  - AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
  - AWS_BUCKET_NAME=your_s3_bucket_name
```

## Issues Fixed

1. ✅ Added missing File import in fileController.js
2. ✅ Added getTaskById route and controller function
3. ✅ Added AWS environment variables to docker-compose.yml
4. ✅ Improved error handling for S3 operations
5. ✅ Added better error messages for debugging

## Running the Application

```bash
# Using Docker
docker-compose up --build

# Or locally
cd backend
npm install
npm start
``` 