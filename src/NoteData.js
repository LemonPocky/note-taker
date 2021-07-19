// Needed to read/write data to files
const fs = require('fs').promises;
// Required to use path.join
const path = require('path');
// Generates unique ids for notes
const { nanoid } = require('nanoid');

const ID_LENGTH = 10;

class NoteData {
  constructor() {
    this.notes = [];
  }

  async loadNotesFromFile() {
    const data = await fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8');
    this.notes = JSON.parse(data);
  }
  
  getNotes() {
    return this.notes;
  }

  async save(note) {
    if (!note.id) {
      note.id = nanoid(ID_LENGTH);
    }
    this.notes.push(note);
    await fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(this.notes));
  }
}

module.exports = NoteData;