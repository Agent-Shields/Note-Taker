const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// get request to db.json
app.get('/api/notes', (req,res) => {
  var notes = JSON.parse(fs.readFileSync('./db/db.json'));
  res.json(notes);
})

// get request send notes html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// get else requests send index.html
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

// post request send notes
app.post('/api/notes', (req,res) => {
  var newNote = req.body;
  var notes = JSON.parse(fs.readFileSync('./db/db.json'));
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});