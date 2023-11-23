const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { loginRequest,signupRequest } = require('./public/route/router.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './public/static')))
app.use(bodyParser.json());

app.post('/login', loginRequest)
app.post('/signup',signupRequest)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});