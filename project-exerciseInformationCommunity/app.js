const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './public/static')))
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  console.log(email, password)

  // 여기서 email과 password를 사용하여 사용자 인증 등의 로직을 수행
  // 실제로는 데이터베이스에서 사용자를 찾아 비밀번호를 확인하는 등의 과정이 필요

  // 예시: 간단한 응답 전송
  res.json({ success: true, message: 'Login successful' });
});

app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // 여기서 email과 password를 사용하여 회원가입 로직을 수행
  // 실제로는 데이터베이스에 사용자 정보를 저장하는 등의 과정이 필요

  // 예시: 간단한 응답 전송
  res.json({ success: true, message: 'Sign up successful' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});