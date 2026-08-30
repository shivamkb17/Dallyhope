const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('about', {
    title: 'About Us — Dally\'s Hope 4 Paws Rescue',
    currentPage: 'about'
  });
});

module.exports = router;
