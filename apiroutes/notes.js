// Required to use path.join
const path = require('path');

// Manages our user data
const NoteData = require('../src/NoteData.js');
const noteData = new NoteData();

// Called once on server start
function loadNotesApi(app) {
  // Load all notes from "database"
  noteData.loadAll();
  app.get("/api/notes", (req, res) => {
    res.json(noteData.getNotes());
  });

  app.post("/api/notes", (req, res) => {
    // Parse the request to get a JSON object
    const note = JSON.parse(req.body);
    noteData.save(note);
  })
}

module.exports = loadNotesApi;
