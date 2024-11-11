import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });
            const data = await response.json();
            if (data.success) {
                // Save token to local storage or state
                localStorage.setItem('token', data.token);
                console.log('Token saved to local storage: ' + data.token);
                // Navigate to the Note component after successful login
                navigate('/retrieve'); // Redirect to the Note page
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='hero h-full flex flex-col items-center justify-center p-11'>

            <form onSubmit={handleSubmit} className="shadow-[20px] border-2 border-gray-700 h-auto w-80 rounded-[20px] p-6 m-auto max-w-sm backdrop-blur-2xl ">
            <h1 className='text-orange-500 font-semibold text-3xl mb-5'>Login Page</h1>
                <label className='flex flex-col gap-3 font-bold text-black'>
                    Username:
                    <input
                        className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <label className='flex flex-col gap-3 font-bold text-black'>
                    Password:
                    <input
                        className="w-full px-3 py-2 border rounded-[20px] focus:outline-none focus:ring-2 focus:ring-gray-500"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button
                    type="submit"
                    className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 mt-3 rounded-[20px] focus:outline-none focus:shadow-outline">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
