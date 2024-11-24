const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const port = 3000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Update this with your frontend URL
    credentials: true,
}));


// Middleware to protect routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Access token required' });
    
    // Extract the token from "Bearer <token>"
    const token = authHeader.split(' ')[1]; // Get the token part only
    
    // Token verification
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // Set the user info on req for access in subsequent middleware
        next();
    });
};


// User Registration
app.post('/user/create', async (req, res) => {
    const { name, password } = req.body; //key value pairs

    try {
        const existingUser = await prisma.user.findUnique({ where: { name } });
        if (existingUser) return res.status(400).json({ message: "Username already exists" });

        // Hash the password of the new user before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
           data: { name, password: hashedPassword }
        });

        res.json({ success: true, user: { id: newUser.id, name: newUser.name } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User Login
app.post('/user/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { name } });
        if (!user) return res.status(400).json({ message: "User not found" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Incorrect password" });

        //generate a token if password is valid
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Protected Route: Retrieve a User
app.get('/user/:id', authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Protected Route: Retrieve a Note by ID
app.get('/note/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
  
    try {
      // Fetch the note by ID
      const note = await prisma.note.findUnique({
        where: { id: parseInt(id) },
      });
      
      if (!note) return res.status(404).json({ message: "Note not found" });
      if (note.userId !== userId) return res.status(403).json({ message: "Not authorized" });
  
      res.json({ success: true, note });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Protected Route: List All Notes Owned by a User
app.get('/notes', authenticateToken, async (req, res) => {
    const { userId } = req.user;

    try {
        const notes = await prisma.note.findMany({ where: { userId } });
        if (notes.length === 0) return res.status(404).json({ message: "No notes found for this user" });

        res.json({ success: true, notes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Endpoint for creating a new note
app.post('/create/note', authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    const { userId } = req.user;

    // Ensure title, content, and userId are defined
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const newNote = await prisma.note.create({
            data: {
                title,
                content,
                userId, 
            },
        });

        res.json({ success: true, note: newNote });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});




// Protected Route: Delete a Note
app.delete('/note/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    try {
        const note = await prisma.note.findUnique({ where: { id: parseInt(id) } });
        if (!note) return res.status(404).json({ message: "Note not found" });
        if (note.userId !== userId) return res.status(403).json({ message: "Not authorized" });

        await prisma.note.delete({ where: { id: parseInt(id) } });
        res.json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//edit note 
app.patch('/note/edit/:id', authenticateToken, async (req, res) => {
    const { id } = req.params; // Note ID to edit
    const { title, content } = req.body; // New title and content for the note
    const { userId } = req.user; // User ID from the authenticated token

    try {
        // Check if the note exists and belongs to the user
        const note = await prisma.note.findUnique({ where: { id: parseInt(id) } });
        if (!note) return res.status(404).json({ message: "Note not found" });
        if (note.userId !== userId) return res.status(403).json({ message: "Not authorized" });

        // Update the note with the new title and content
        const updatedNote = await prisma.note.update({
            where: { id: parseInt(id) },
            data: { title, content },
        });

        res.json({ success: true, note: updatedNote });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Generate a token for sharing a specific note
app.post('/share/:id', (req, res) => {
    const { id } = req.params;
    try {
       
    } catch (error) {
        res.status(500).json({ error: 'Error generating share token' });
    }
});

app.get('/public/note/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SHARE_SECRET);

        // Check if the token’s noteId matches the requested note id
        if (decoded.noteId !== parseInt(id)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const note = await prisma.note.findUnique({ where: { id: parseInt(id) } });
        if (!note) return res.status(404).json({ message: "Note not found" });

        res.json({ success: true, note });
    } catch (error) {
        console.error('Token verification error:', error); // Log the error for debugging
        res.status(500).json({ error: 'Invalid or expired token' });
    }
});



app.get('/notes/search', authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const { query } = req.query; // Get the search term from query parameters

    try {
        const notes = await prisma.note.findMany({
            where: {
                userId: userId,
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { content: { contains: query, mode: 'insensitive' } }
                ]
            }
        });
        res.json({ success: true, notes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
