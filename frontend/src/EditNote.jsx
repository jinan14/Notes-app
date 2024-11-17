

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

function EditNote() {
    const { id } = useParams(); // Get the note ID from the URL params
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/note/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setNote(response.data.note);
                setTitle(response.data.note.title);
                setContent(response.data.note.content);
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };
        fetchNote();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const updatedNote = { title, content };
            const editedNote = await axios.patch(`http://localhost:3000/note/edit/${id}`, updatedNote, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            if (editedNote) {
                console.log(editedNote);
                navigate('/retrieve'); // Redirect to the /retrieve route after successful update
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    if (!note) return <div className='text-black font-bold text-3xl flex items-center justify-center mt-44'>Loading...</div>;

    return (
        <div className="hero h-full flex flex-col items-center justify-center p-4 sm:p-8">
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col text-black gap-5 shadow-lg border-2 border-gray-700 w-full max-w-md rounded-2xl p-6 backdrop-blur-2xl"
          >
            <h2 className="text-orange-400 text-2xl sm:text-3xl font-semibold text-center">Edit Note</h2>
      
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
      
            <textarea
              value={content}
              className="w-full h-40 sm:h-56 resize-none px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              required
            />
      
            <button
              type="submit"
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 mt-3 rounded-2xl focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </form>
        </div>
      );
      
}

export default EditNote;
