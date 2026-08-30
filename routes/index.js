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

  // Show first 3 available dogs as featured
  const featured = dogs
    .filter(d => d.status === 'available')
    .slice(0, 3);

  res.render('home', {
    title: 'Dally\'s Hope 4 Paws Rescue — Hagaman, NY',
    currentPage: 'home',
    featuredDogs: featured
  });
});

module.exports = router;
