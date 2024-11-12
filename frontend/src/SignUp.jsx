import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // Make a POST request to the backend for user registration
            const response = await axios.post('http://localhost:3000/user/create', {
                name,
                password,
            });
            setSuccess('User registered successfully!');
            setName('');
            setPassword('');

            // Navigate to the login page after successful registration
            setTimeout(() => {
                navigate('/login');
            }, 1500); // Delay navigation to show the success message
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Registration failed');
            } else {
                setError('An error occurred');
            }
        }
    };

    return (
        <div className="hero h-full flex flex-col items-center justify-center p-4 sm:p-8 lg:p-11">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 m-auto backdrop-blur-3xl shadow-lg rounded-[20px] border border-transparent">
            <h2 className="text-orange-500 font-semibold text-2xl sm:text-3xl text-center mb-5">
              Sign Up
            </h2>
            {error && <p className="text-red-500 text-center mb-3">{error}</p>}
            {success && <p className="text-green-600 text-center mb-3">{success}</p>}
      
            <form
              onSubmit={handleSubmit}
              className="shadow-md border border-gray-300 rounded-[20px] p-4 sm:p-6backdrop-blur-lg"
            >
              <div className="mb-4">
                <label className="flex flex-col gap-2 font-bold text-black">
                  Email
                </label>
                <input
                  type="text"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-black px-3 py-2 border rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="mb-4">
                <label className="flex flex-col gap-2 font-bold text-black">
                  Username
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full text-black px-3 py-2 border rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div className="mb-4">
                <label className="flex flex-col gap-2 font-bold text-black">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-black px-3 py-2 border rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-[20px] focus:outline-none focus:shadow-outline transition-colors duration-200"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      );
      
}

export default SignUp;
