const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const verifyToken = require('../middleware/auth');

// Get all notes for logged-in user
router.get('/', verifyToken, async (req, res) => {
  const notes = await Note.find({ user: req.userId });
  res.json(notes);
});

// Create a new note
router.post('/', verifyToken, async (req, res) => {
  const note = new Note({
    user: req.userId,
    text: req.body.text
  });
  await note.save();
  res.json(note);
});

// Delete a note
router.delete('/:id', verifyToken, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ message: 'Note deleted' });
});

module.exports = router;
