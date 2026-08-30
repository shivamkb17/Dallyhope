require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/about', require('./routes/about'));
app.use('/adopt', require('./routes/adopt'));
app.use('/help', require('./routes/help'));
app.use('/contact', require('./routes/contact'));

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found — Dally\'s Hope 4 Paws Rescue',
    currentPage: ''
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
