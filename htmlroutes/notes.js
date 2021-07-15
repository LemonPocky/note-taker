const path = require('path');

function loadNotesHtml(app) {
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
}

module.exports = loadNotesHtml;
