const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "app_ui/build")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "app_ui/build", "index.html"));
});

console.log("App listening on port 80!");
app.listen(80);
