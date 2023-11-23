//* server module
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const { loginRequest, signupRequest } = require('./public/route/router.js');

const app = express();
const port = 3000;

//* 미들웨어 설정
app.use(express.static(path.join(__dirname, './public/static')))
app.use(bodyParser.json());

//* MongoDB 연결 설정
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//* 라우팅
app.post('/login', loginRequest)
app.post('/signup', signupRequest)

//* 서버가동
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});