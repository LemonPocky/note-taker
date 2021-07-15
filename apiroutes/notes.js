// Required to use path.join
const path = require('path');

function loadNotesApi(app) {
  app.get('/api/notes');
}

function getNotes() {}

function saveNote(note) {}

module.exports = loadNotesApi;
