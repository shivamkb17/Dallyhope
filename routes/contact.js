const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
  res.render('contact', {
    title: 'Contact Us — Dally\'s Hope 4 Paws Rescue',
    currentPage: 'contact',
    success: null,
    error: null,
    formData: {}
  });
});

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.render('contact', {
      title: 'Contact Us — Dally\'s Hope 4 Paws Rescue',
      currentPage: 'contact',
      error: 'Please fill in all fields.',
      success: null,
      formData: req.body
    });
  }

  // Save message to local JSON log as fallback
  const messagesPath = path.join(__dirname, '..', 'data', 'messages.json');
  const entry = {
    name,
    email,
    subject,
    message,
    date: new Date().toISOString()
  };

  try {
    let messages = [];
    if (fs.existsSync(messagesPath)) {
      messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
    }
    messages.push(entry);
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error('Could not save message:', err.message);
  }

  // Try to send email if SMTP is configured
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || 'contact@dallyshope4paws.org',
        replyTo: email,
        subject: `[Website] ${subject} — from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`
      });
    } catch (err) {
      console.error('Email send failed (message saved locally):', err.message);
    }
  }

  res.render('contact', {
    title: 'Contact Us — Dally\'s Hope 4 Paws Rescue',
    currentPage: 'contact',
    success: 'Thank you for reaching out! We\'ll get back to you as soon as we can.',
    error: null,
    formData: {}
  });
});

// Newsletter signup
router.post('/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.redirect('back');
  }

  const subscribersPath = path.join(__dirname, '..', 'data', 'subscribers.json');

  try {
    let subscribers = [];
    if (fs.existsSync(subscribersPath)) {
      subscribers = JSON.parse(fs.readFileSync(subscribersPath, 'utf8'));
    }

    // Avoid duplicates
    if (!subscribers.find(s => s.email === email)) {
      subscribers.push({
        email,
        date: new Date().toISOString()
      });
      fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));
    }
  } catch (err) {
    console.error('Could not save subscriber:', err.message);
  }

  // Redirect back to the page they came from with a hash to show success
  const referer = req.get('Referer') || '/';
  const redirectUrl = referer.split('#')[0] + '#newsletter-success';
  res.redirect(redirectUrl);
});

module.exports = router;
