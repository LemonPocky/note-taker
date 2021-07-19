// Required to use path.join
const path = require('path');

// Manages our user data
const NoteData = require('../src/NoteData.js');
const noteData = new NoteData();

// Called once on server start
function loadNotesApi(app) {
  // Load all notes from "database"
  noteData.loadNotesFromFile();

  // GET all notes
  app.get("/api/notes", (req, res) => {
    res.json(noteData.getNotes());
  });

  // POST and save a new note
  app.post("/api/notes", (req, res) => {
    // Parse the request to get a JSON object
    const note = req.body;
    noteData.save(note)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        res.end();
      })
  });

  // DELETE a note based on the id given
  // If the note doesn't exist, returns a 404
  app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    noteData.delete(id)
      .catch((error) => {
        if (error.message === `Note ID not found.`) {
          res.sendStatus(404);
        } else {
          res.sendStatus(500);
        }
      })
      .finally( () => {
        res.end();
      });
  });
}

module.exports = loadNotesApi;
