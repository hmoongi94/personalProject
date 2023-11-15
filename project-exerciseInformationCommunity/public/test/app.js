const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 사용자 모델 정의
const User = mongoose.model('User', {
    username: String,
    email: String,
    password: String,
});

// body-parser 설정
app.use(bodyParser.json());

// 회원가입 엔드포인트
app.post('/signup', async (req, res) => {
    try {
        // 클라이언트에서 전달된 데이터
        const { username, email, password } = req.body;

        // 데이터베이스에 사용자 정보 저장
        const newUser = new User({ username, email, password });
        await newUser.save();

        // 응답 전송
        res.json({ success: true, message: '회원가입이 완료되었습니다.' });
    } catch (error) {
        console.error('회원가입 실패:', error);
        res.status(500).json({ success: false, message: '회원가입에 실패했습니다. 다시 시도해주세요.' });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});