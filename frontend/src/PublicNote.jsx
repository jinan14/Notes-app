import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PublicNote() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                // Retrieve the token from the URL query param
                const token = new URLSearchParams(window.location.search).get('token');

                if (!token) {
                    throw new Error('Token is required');
                }

                // Make the request with the token included
                const response = await axios.get(`http://localhost:3000/public/note/${id}`, {
                    params: { token } // Send token as query parameter
                });

                setNote(response.data.note);
            } catch (error) {
                console.error('Error fetching public note:', error);
                setError(error.message); // Set error message to display
            }
        };

        fetchNote();
    }, [id]);

    if (error) return <div>Error: {error}</div>;
    if (!note) return <div>Loading...</div>;

    return (
        <div className="hero text-black h-full flex flex-col items-center justify-center p-11">
            <div className="border border-black p-4 rounded-md shadow-sm backdrop-blur-xl max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">{note.title}</h2>
                <p className="text-lg">{note.content}</p>
            </div>
        </div>
    );
}

export default PublicNote;
