const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [];
let currentId = 1; // Memulai id dari 1

// Get all users
app.get('/users', (req, res) => {
  res.status(200).send(users);
});

// Get single user
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send({ message: 'User Tidak Ditemukan' });
  }
});

// Search user by name
app.get('/search', (req, res) => {
  const nama = req.query.nama;
  const user = users.find(user => user.name === nama);
  
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send({ message: 'User Tidak ada di database' });
  }
});

// Create user
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'Tolong masukan nama terlebih dahulu' });
  }

  const user = {
    id: currentId++, 
    name
  };

  users.push(user);
  res.status(201).send(user);
});

// Update user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    users[userIndex].name = name;
    res.status(200).send(users[userIndex]);
  } else {
    res.status(404).send({ message: 'User Tidak ada di database' });
  }
});

// Delete user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).send({ message: 'User telah berhasil dihapus' });
  } else {
    res.status(404).send({ message: 'User Tidak ada di database' });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
