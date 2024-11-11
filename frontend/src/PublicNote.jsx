

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PublicNote() {
    const { id } = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/public/note/${id}`);
                setNote(response.data.note);
            } catch (error) {
                console.error('Error fetching public note:', error);
            }
        };
        fetchNote();
    }, [id]);

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
