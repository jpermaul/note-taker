const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const database = require('./db/db.json')
const fs = require('fs');
const { stringify } = require('querystring');


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for API, returns contents of database.
app.get('/api/notes', (req, res) =>
  res.json(database)
);

// GET Route for post request, writes note to database
app.post('/api/notes', (req, res) => { 
    req.body.id = Math.floor(Math.random()*1000000000);
    database.push(req.body)
    fs.writeFileSync('./db/db.json', JSON.stringify(database))


  res.json(database)
}
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
app.delete('/api/notes/:id', (req, res) => {
    for (let i = 0; i < database.length; i++) {
      if (req.params.id == database[i].id) {
        database.splice(i, 1);
      }
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(database))


  res.json(database)
}
);
