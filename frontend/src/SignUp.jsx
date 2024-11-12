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
        <div className='hero h-full flex flex-col items-center justify-center p-11 '>
            <div className="w-full max-w-md p-8 m-auto backdrop-blur-3xl shadow-[20px] rounded-[20px] border border-transparent">
                <h2 className="text-orange-500 font-semibold text-3xl text-center mb-5">Sign Up</h2>
                {error && <p className="text-red-500 text-center mb-3">{error}</p>}
                {success && <p className="text-green-600 text-center  mb-3">{success}</p>}
                <form onSubmit={handleSubmit}  className="shadow-[20px] border-2 border-gray-700 h-auto w-80 rounded-[20px] p-6 m-auto max-w-sm backdrop-blur-2xl ">
                    <div>
                        <label  className='flex flex-col gap-3 font-bold text-black'>Email</label>
                        <input
                            type="text"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                           className="w-full text-black px-3 py-2 border rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>
                    <div>
                        <label  className='flex flex-col gap-3 font-bold text-black'>Username</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                           className="w-full text-black px-3 py-2 border rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>
                    <div>
                        <label  className='flex flex-col gap-3 font-bold text-black'>Password</label>
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
                        className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 mt-3 rounded-[20px] focus:outline-none focus:shadow-outline"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
