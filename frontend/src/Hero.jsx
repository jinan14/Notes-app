import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

function Hero() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleToggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className='w-full flex h-[100vh]'>
      <div className='w-[60%]'>
        <img className='object-cover w-full h-full' src="/Hero2.jpg" alt="" />
      </div>

      <div
        className={`h-full flex flex-col gap-6  text-center w-[40%] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
      >
        <div className='flex justify-end'>
          <button 
            onClick={handleToggleMode} 
            className="px-4 rounded-3xl mt-2 py-2 bg-orange-300 text-white"
          >
            {/* Render the appropriate icon based on isDarkMode */}
            {isDarkMode ? <IoSunny /> : <IoMoon />}
          </button>
        </div>
        <div className='flex flex-col gap-6 m-auto items-center justify-center text-center'>
          <h1 className={`font-semibold ${isDarkMode ? 'text-orange-300' : 'text-orange-500'}`}>
            Thought Bubble
          </h1>
          <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Welcome to the best notes app! <br /> The place where you free your thoughts
          </p>
          <div className='flex gap-3 mt-4'>
            <button
              className={`rounded-3xl w-[111px] ${isDarkMode ? 'bg-orange-300' : 'bg-orange-400'} text-white`}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className={`rounded-3xl w-[111px] ${isDarkMode ? 'bg-gray-600' : 'bg-gray-800'} text-white`}
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
