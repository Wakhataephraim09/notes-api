const express = require('express');
const cors = require('cors'); // ✅ Added CORS

const app = express();
const PORT = 3000;

app.use(cors()); // ✅ Enable CORS
app.use(express.json());

// Root route (fix "Cannot GET /")
app.get('/', (req, res) => {
    res.send('Notes API is running 🚀');
});

// Temporary database
let notes = [];

// GET all notes
app.get('/notes', (req, res) => {
    res.json(notes);
});

// GET single note
app.get('/notes/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
});

// CREATE note
app.post('/notes', (req, res) => {
    const note = {
        id: notes.length + 1,
        content: req.body.content
    };
    notes.push(note);
    res.status(201).json(note);
});

// UPDATE note
app.put('/notes/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.content = req.body.content;
    res.json(note);
});

// DELETE note
app.delete('/notes/:id', (req, res) => {
    notes = notes.filter(n => n.id !== parseInt(req.params.id));
    res.json({ message: 'Note deleted' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
