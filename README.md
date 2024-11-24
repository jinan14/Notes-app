Notes App
A Notes App that allows users to sign up, log in, create, edit, delete, and search their personal notes. This project is built with a Vite React frontend and an Express.js backend.

Features
User Authentication:
Secure signup and login functionality.
Users can create their accounts and manage their notes securely.
CRUD Operations:
Create, edit, and delete notes.
Notes are tied to specific user accounts.
Search Functionality:
Easily find notes using a search bar.
Logout Functionality:
Securely log out from the application.

Technologies Used
Frontend
Vite React: A fast and modern development environment.
React Router: For navigation between pages.

Backend
Express.js: Backend framework for handling API requests.
JWT: For secure user authentication.
Nodemon: For development server monitoring.

Database
Supabase

Setup Instructions
Prerequisites
Ensure you have the following installed:

Node.js (version X.X or higher)
npm (or yarn)
Installation
Clone the repository:

bash
Copy code
git clone <repository_url>
cd notes-app
Install dependencies:

For the frontend:
bash
Copy code
cd frontend
npm install
For the backend:
bash
Copy code
cd backend
npm install
Set up environment variables:

Create an .env file in the backend directory and add your configurations:
env
Copy code
PORT=5000
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url
Adjust as needed for your app.
Running the Application
Start the backend server: Navigate to the backend directory and run:

bash
Copy code
nodemon index.js
Start the frontend application: Navigate to the frontend directory and run:

bash
Copy code
npm run dev
Open your browser and go to http://localhost:5173 to view the app.

How to Use
Sign Up: Create a new account by providing your email and password.
Login: Log in with your credentials to access your notes.
Manage Notes:
Create new notes.
Edit existing notes.
Delete notes you no longer need.
Use the search bar to find specific notes.
Logout: Securely log out from your account.
