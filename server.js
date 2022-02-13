const express = require('express');
const path = require('path');
const fs = require('fs');
const { notes }  = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// get request to db.json
app.get('/api/notes', (req,res) => {
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
  console.log(req.body);
  res.json(req.body);
  return new Promise((resolve, reject) => {
    fs.writeFile('./db/db.json', JSON.stringify(req.body), err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'Note added!'
      })
    })
  })
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});