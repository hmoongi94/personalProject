import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

// 로그인, 회원가입
import customerSignup from "./routes/Signup";
import customerLogin from "./routes/Login";
// 메인페이지
import exercisedata from "./routes/exerciseguide/exercisedata";
import exercisedetail from "./routes/exerciseguide/exercisedetaildata";
import searchexercisedata from "./routes/exerciseguide/searchexercisedata";
import recordData from "./routes/timer/recordData";
import workoutHistoryDayData from "./routes/workoutHistory/workHistoryDayData";
import caloryDayData from "./routes/workoutHistory/caloriesDayData";
import workoutHistoryPeriodData from "./routes/workoutHistory/workHistoryPeriodData";
import caloryPeriodData from "./routes/workoutHistory/caloriesPeriodData";
// 커뮤니티
import postData from "./routes/community/postdata";
import userId from "./routes/community/userid";
import likeData from "./routes/community/likedata";
import deletePost from "./routes/community/deletepost";
import registerFeed from "./routes/community/registerfeed/registerfeed";
import editPost from "./routes/community/editpost/editpost";

const app = express();
const port = 3560;

// 미들웨어
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// *라우팅
// 로그인, 회원가입
app.post("/signup", customerSignup);
app.post("/login", customerLogin);
// 메인페이지
app.get("/exercisedata", exercisedata);

// 메인페이지 기능
// exerciseguide
app.get("/exercisedetail/:exerciseIndex", exercisedetail);
// 검색 데이터
app.get("/searchexercisedata", searchexercisedata);
// 타이머에서 내 운동 기록
app.post("/recordData", recordData);
// workouthistory에서 기록보기
app.post("/workoutHistory/daydata", workoutHistoryDayData);
app.post("/workoutHistory/daydata/calories", caloryDayData);
app.post("/workoutHistory/periodData", workoutHistoryPeriodData);
app.post("/workoutHistory/periodData/calories", caloryPeriodData);

// 커뮤니티
app.get("/community/postData", postData);
app.get("/userId", userId);
app.get("/community/likeData", likeData)
app.get("/community/deletepost/:postId", deletePost)
// 피드등록
app.post("/community/registerFeed", registerFeed);
// 피드수정
app.get("/community/editpost/:postId", editPost)

app.listen(port, () => {
  console.log(`Express 서버가 ${port}번 포트에서 실행중입니다.`);
});
