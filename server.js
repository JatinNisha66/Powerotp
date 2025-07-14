
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { adminUser, adminPass } = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/admin', express.static('admin'));

app.get('/api/otp', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/otp.json', 'utf8'));
  res.json(data);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === adminUser && password === adminPass) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.listen(3000, () => console.log('PowerOTP running on http://localhost:3000'));
