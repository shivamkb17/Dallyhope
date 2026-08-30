const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('help', {
    title: 'How to Help — Dally\'s Hope 4 Paws Rescue',
    currentPage: 'help'
  });
});

module.exports = router;
