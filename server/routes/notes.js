const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const verifyToken = require('../middleware/auth');

// ✅ Get all notes for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
});

// ✅ Create a new note
router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const note = new Note({
      user: req.userId,
      title,
      content
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create note' });
  }
});

// ✅ Delete a note
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete note' });
  }
});

module.exports = router;
