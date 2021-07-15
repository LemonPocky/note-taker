const path = require("path");

function loadHomeHtml(app) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
}

module.exports = loadHomeHtml;
