import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

// 고객페이지
import customerSignup from "./routes/Signup";
// 메인페이지
import exercisedata from "./routes/exerciseguide/exercisedata";

// 메인페이지기능
import exercisedetail from "./routes/exerciseguide/exercisedetaildata";
import searchexercisedata from "./routes/exerciseguide/searchexercisedata";
import recordData from "./routes/record/recordData";

const app = express();
const port = 3560;

// 미들웨어
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// *라우팅
// 로그인, 회원가입
app.post("/signup", customerSignup);
// 메인페이지
app.get("/exercisedata", exercisedata);

// 메인페이지 기능
  // exerciseguide
  app.get("/exercisedetail/:exerciseIndex", exercisedetail)
  // 검색 데이터
  app.get("/searchexercisedata", searchexercisedata)
  app.post("/recordData", recordData)

app.listen(port, () => {
  console.log(`Express 서버가 ${port}번 포트에서 실행중입니다.`);
});
