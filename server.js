const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const { db }  = require('./db/db.json');


// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// get request to db.json
app.get('/api/notes', (req,res) => {
  res.json(db);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});