const express = require('express')
const app = express()
const path = require('path')
const port = 5001

// 미들웨어
// app.use(express.static(path.join(__dirname, './static')))
// app.use(express.json())

// 라우트
const {mainpageRequest} = require('./public/route/route.js')

app.get('/', mainpageRequest)



// 서버 가동
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});