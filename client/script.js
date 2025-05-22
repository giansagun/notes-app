const API_URL = 'http://localhost:5000/api/notes';

async function fetchNotes() {
  const res = await fetch(API_URL);
  const notes = await res.json();

  const notesDiv = document.getElementById('notes');
  notesDiv.innerHTML = '';

  notes.forEach(note => {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="deleteNote('${note._id}')">Delete</button>
    `;
    notesDiv.appendChild(noteElement);
  });
}

async function addNote() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (!title || !content) {
    alert('Please enter title and content');
    return;
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  document.getElementById('title').value = '';
  document.getElementById('content').value = '';

  fetchNotes();
}

async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  fetchNotes();
}

// Load notes on page load
window.onload = fetchNotes;
