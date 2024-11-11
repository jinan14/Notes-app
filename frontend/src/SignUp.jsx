import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
