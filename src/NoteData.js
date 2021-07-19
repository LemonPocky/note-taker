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

  // Saves notes in memory to file
  async saveNotesToFile() {
    return await fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(this.notes)
    );
  }
  
  getNotes() {
    return this.notes;
  }

  // Saves a note to notes
  async save(note) {
    // Assign a new random id to the note before storing it
    if (!note.id) {
      note.id = nanoid(ID_LENGTH);
    }
    this.notes.push(note);
    return await this.saveNotesToFile();
  }

  // Method to delete a note from notes
  async delete(id) {
    // Filter out notes that match the id
    // This is the same as deleting the note from our list of notes
    const newNotesList = this.notes.filter((note) => {
      return note.id !== id;
    });
    // If the lists are the same length, we didn't delete anything
    if (this.notes.length === newNotesList.length) {
      throw new Error(`Note ID not found.`);
    } else {
      this.notes = newNotesList;
      return await this.saveNotesToFile();
    }
  }
}

module.exports = NoteData;