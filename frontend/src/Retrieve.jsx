import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './useAuthStore';
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import axios from 'axios';


function Retrieve() {
    const token = useAuthStore((state) => state.token);
    const notess = useAuthStore((state) => state.notes);
    const fetchNotes = useAuthStore((state) => state.fetchNotes);
    const deleteNote = useAuthStore((state) => state.deleteNote);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchNotes(token); // Fetch notes when the component loads
        }
    }, [token, fetchNotes, navigate]);

    const handleCreateNote = () => {
        navigate('/note'); // Navigate to /note route
    };

    const handleDelete = (id) => {
        deleteNote(id, token); // Delete the note by ID
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`); // Navigate to the edit page for this note
    };

    const handleShare = (id) => {
        const shareableUrl = `${window.location.origin}/public/note/${id}`;
        navigator.clipboard.writeText(shareableUrl)
            //window.location.origin represents the base URL of the current site (e.g., http://localhost:3000 in development

            ///public/note/${id}, we get a full URL that points to the public view of the note  

            // line uses the Clipboard API to copy shareableUrl to the user's clipboard.

            //navigator.clipboard.writeText() is an asynchronous function that copies text to the clipboard, allowing users to paste the link elsewhere.
            .then(() => {
                alert('Shareable link copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy shareable link: ', err);
            });
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/notes/search?query=${searchTerm}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFilteredNotes(response.data.notes);
        } catch (error) {
            console.error('Error searching notes:', error);
        }
    };

    return (
        <div className="hero h-full">
          {/* Header */}
          <div className="text-black flex flex-wrap justify-between items-center p-4 sm:p-8 w-full backdrop-blur-xl shadow-md">
            <button
              onClick={() => navigate('/note')}
              className="w-10 h-10 flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline"
            >
              <FaPlus />
            </button>
      
            <h2 className="text-2xl sm:text-3xl text-orange-400 font-bold">Your Notes</h2>
      
            {/* Search & Logout Section */}
            <div className="flex flex-grow sm:flex-grow-0 gap-3 items-center justify-center w-full sm:w-auto mt-4 sm:mt-0">
              <input
                className="flex-grow sm:flex-grow-0 w-full sm:w-auto px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes..."
              />
              <button
                className="w-10 h-10 bg-orange-400 hover:bg-orange-500 text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline"
                onClick={handleSearch}
              >
                <IoSearch />
              </button>
              <button
                className="w-10 h-10 bg-red-500 hover:bg-red-600 flex items-center justify-center text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline"
                onClick={() => navigate(`/login`)}
              >
                <FiLogOut />
              </button>
            </div>
          </div>
      
          {/* Notes List */}
          <div className="flex flex-col items-center pt-5 justify-center p-4">
            {(filteredNotes.length > 0 ? filteredNotes : notess).map((note) => (
              <div
                key={note.id}
                className="border-black border flex flex-col p-4 mb-4 w-full max-w-md rounded-md shadow-sm backdrop-blur-xl"
              >
                <h3 className="font-bold text-black text-lg sm:text-xl">{note.title}</h3>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
                  <p className="font-semibold text-black">{note.content}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteNote(note.id, token)}
                      className="w-9 h-9 flex justify-center items-center bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline"
                    >
                      <RiDeleteBin5Fill />
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${note.id}`)}
                      className="w-9 h-9 flex justify-center items-center bg-orange-400 hover:bg-orange-500 text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleShare(note.id)}
                      className="w-9 h-9 flex justify-center items-center bg-blue-400 hover:bg-blue-500 text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline"
                    >
                      <FaShare />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
}

export default Retrieve;