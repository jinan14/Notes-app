// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './Hero';
import Login from './Login';
import SignUp from './SignUp';
import Note from './Note';
import Retrieve from './Retrieve';
import EditNote from './EditNote';
import PublicNote from './PublicNote';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/note" element={<Note />} />
                <Route path="/retrieve" element={<Retrieve />} />
                <Route path="/edit/:id" element={<EditNote />} />
                <Route path="/retrieve" element={<Retrieve />} />
                <Route path="/public/note/:id" element={<PublicNote />} />
            </Routes>
        </Router>
    );
}

export default App;
