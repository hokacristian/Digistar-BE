const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./database/db');
const query = require('./database/query'); // Import your queries module

db.connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to GET all users - returns the users array as JSON
app.get('/users', (req, res) => {
  query.getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Route to GET a single user by index
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  query.getUserById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Route to POST a new user - adds a new user to the users array
app.post('/users', (req, res) => {
  const { name, age } = req.body; // Extract the user from the request body
  if (!name || !age) {
    return res.status(400).json({ message: 'Please provide both name and age' });
  }

  query.createUser({ name, age }) // Add the new user to the database
    .then(user => {
      res.status(201).json(user); // Respond with the created user and status code 201
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Route to PUT (update) a user by id
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  query.updateUser(id, { name, age })
    .then(updatedUser => {
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Route to DELETE a user by id
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  query.deleteUser(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
