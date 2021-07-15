// Express used for server functions
const express = require('express');

// Files for loading routes
// There's probably a better way to do this
const loadNotesApi = require('./apiroutes/notes.js');
const loadNotesHtml = require('./htmlroutes/notes.js');
const loadHomeHtml = require('./htmlroutes/home.js');

function init() {
  // Set up Express App
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Sets up the Express app to handle data parsing
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Set up routes
  loadHtmlRoutes(app);
  loadApiRoutes(app);

  // Default route
  loadHomeHtml(app);

  // Start the server to begin listening
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

function loadHtmlRoutes(app) {
  loadNotesHtml(app);
}

function loadApiRoutes(app) {
  loadNotesApi(app);
}

init();