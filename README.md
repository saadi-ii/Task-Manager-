# Task Manager

A full-stack task management application with a Node.js/Express backend and a React/Next.js frontend.

## Project Structure

- `frontend/` - Contains the Next.js frontend application.
- `backend/` - Contains the Node.js backend API.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (you can use `.env.example` as a template):
   ```
   PORT=7000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
