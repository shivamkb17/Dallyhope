const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const dogsPath = path.join(__dirname, '..', 'data', 'dogs.json');
  let dogs = [];

  try {
    const data = fs.readFileSync(dogsPath, 'utf8');
    dogs = JSON.parse(data);
  } catch (err) {
    console.error('Could not read dogs.json:', err.message);
  }

  const filter = req.query.status || 'all';
  const filtered = filter === 'all'
    ? dogs
    : dogs.filter(d => d.status === filter);

  res.render('adopt', {
    title: 'Adoptable Dogs — Dally\'s Hope 4 Paws Rescue',
    currentPage: 'adopt',
    dogs: filtered,
    activeFilter: filter
  });
});

router.get('/:id', (req, res) => {
  const dogsPath = path.join(__dirname, '..', 'data', 'dogs.json');
  let dogs = [];

  try {
    const data = fs.readFileSync(dogsPath, 'utf8');
    dogs = JSON.parse(data);
  } catch (err) {
    console.error('Could not read dogs.json:', err.message);
  }

  const dog = dogs.find(d => d.id === req.params.id);
  if (!dog) {
    return res.status(404).render('404', {
      title: 'Dog Not Found — Dally\'s Hope 4 Paws Rescue',
      currentPage: 'adopt'
    });
  }

  res.render('dog-detail', {
    title: `${dog.name} — Adoptable Dog`,
    currentPage: 'adopt',
    dog
  });
});

module.exports = router;
