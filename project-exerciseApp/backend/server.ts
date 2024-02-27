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
import getPostsWithLikes from "./routes/community/getpostswithlikes";
// 게시물 편집
import deletePost from "./routes/community/deletepost";
import registerFeed from "./routes/community/registerfeed/registerfeed";
import editPost from "./routes/community/editpost/editpost";
import updateFeed from "./routes/community/editpost/updatefeed";
// 좋아요
import likeData from "./routes/community/like/likedata";
import addLikeData from "./routes/community/like/addlikedata";
import deleteLikeData from "./routes/community/like/deletelikedata";
// 댓글추가
import addCommentData from "./routes/community/comment/addcomment";
// 댓글삭제
import deleteCommentData from "./routes/community/comment/deletecomment";

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
app.get("/community/deletepost/:postId", deletePost)
// app.get("/community/likes", getPostsWithLikes)

// 좋아요
app.get("/community/likeData", likeData)
app.post("/community/addLikeData/:postId/:userId", addLikeData)
app.delete("/community/deleteLikeData/:postId/:userId", deleteLikeData)

// 피드등록
app.post("/community/registerFeed", registerFeed);
// 피드수정
app.get("/community/editpost/:postId", editPost)
app.post("/community/editFeed/:postId", updateFeed)
// 댓글추가
app.post("/community/addComment/:postId/:userId", addCommentData)
// 댓글삭제
app.delete("/community/deleteComment/:postId/:commentId", deleteCommentData)

app.listen(port, () => {
  console.log(`Express 서버가 ${port}번 포트에서 실행중입니다.`);
});
