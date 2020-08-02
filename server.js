//Setting up dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const dbJSON = require("./db/db.json");

// Setting up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Setting up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Notes HTML route 
app.get("/notes", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/notes.html"));
});

// Index HTML route 
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// GET Routes 

app.get("/api/notes", (req, res) => {
    res.json(dbJSON);

});

// POST Routes

app.post("/api/notes.html", (req, res) => {
    req.body.id = uuidv4();
    dbJSON.push(req.body);
    writeToFile("./db/db.json", JSON.stringify(dbJSON));
    console.log(dbJSON);
    res.json(dbJSON);
});

// DELETE Routes

app.delete("/api/notes/:id", (req, res) => {
    console.log(req.params.id);
    for (let i = 0; i < dbJSON.length; i++) {
        if (dbJSON[1].id === req.params.id) {
            dbJSON.splice(i, 1);
        }
    }
    writeToFile("/db/db.json", JSON.stringify(dbJSON));
    res.json(dbJSON);

})

// Writing to file

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            throw err;
        }
        console.log("Successful");
    });
}

// Listening on port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT + " Enjoy!");
});