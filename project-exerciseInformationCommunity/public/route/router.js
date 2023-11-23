const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//* router
// router.get('/', (req, res) => {
//     const indexHtmlFilePath = path.join(__dirname, '../static/index.html')
//     const indexJSFilePath = path.join(__dirname, '../static/index.js')
//     fs.readFile(indexJSFilePath,'utf8',(err,data)=>{
//       if(err){
//         console.log("js파일을 읽지못함")
//       } else{
//         res.sendFile(indexHtmlFilePath)
//       }
//     })


//     })
//   ;

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  console.log(email)
  console.log(password)

  // 여기서 email과 password를 사용하여 사용자 인증 등의 로직을 수행
  // 실제로는 데이터베이스에서 사용자를 찾아 비밀번호를 확인하는 등의 과정이 필요

  // 예시: 간단한 응답 전송
  res.json({ success: true, message: 'Login successful' });
});

router.post('/signup', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  console.log(email)
  console.log(password)

  // 여기서 email과 password를 사용하여 회원가입 로직을 수행
  // 실제로는 데이터베이스에 사용자 정보를 저장하는 등의 과정이 필요

  // 예시: 간단한 응답 전송
  res.json({ success: true, message: 'Sign up successful' });
});


//* route-module
module.exports = {
  // mainpageRequest: router.get('/')
  loginRequest: router.post('/login'),
  signupRequest: router.post('/signup')
}
