// src/components/Note.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './useAuthStore';
import axios from 'axios';

function Note() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const token = useAuthStore((state) => state.token);
  const addNote = useAuthStore((state) => state.addNote);
  const navigate = useNavigate();

  const handleCreateNote = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/create/note',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        addNote(response.data.note); // Add the new note to Zustand store
        navigate('/retrieve'); // Redirect to notes list page after creating note
      }
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note');
    }
  };

  return (
    <div className="hero h-full flex flex-col items-center justify-center p-4 sm:p-8">
      <form 
        onSubmit={handleCreateNote} 
        className="flex flex-col gap-5 text-black shadow-lg border-2 border-gray-700 w-full max-w-md rounded-2xl p-6 backdrop-blur-2xl"
      >
        <h2 className="text-orange-400 text-2xl sm:text-3xl font-semibold text-center">Create a New Note</h2>
  
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
  
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 sm:h-56 resize-none px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
  
        <button
          type="submit"
          className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 mt-3 rounded-2xl focus:outline-none focus:shadow-outline"
        >
          Create Note
        </button>
      </form>
    </div>
  );
  
}

export default Note;
