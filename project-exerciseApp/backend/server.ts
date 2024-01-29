import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';

// 고객페이지
import customerSignup from './routes/Signup';

const app = express();
const port = 3560;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// 로그인, 회원가입
app.post("/signup", customerSignup);

app.listen(port, () => {
  console.log(`Express 서버가 ${port}번 포트에서 실행중입니다.`);
});
