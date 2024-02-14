import express, { Request, Response } from "express";
import pool from "../../database";
import multer from "multer";
import { tokenChecker } from "../../utils/tokenChecker";

const registerFeed = express();

function hashCode(str: string): number {
  let hash: number = 0;
  for (let i = 0; i < str.length; i++) {
    const chr: number = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

//* 이미지 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/community");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

registerFeed.post(
  "/community/registerFeed",
  upload.array("images", 5),
  async (req: Request, res: Response) => {
    // console.log(req.body);

    let conn;

    // * 쿼리문
    const insertImagesQuery = `
    INSERT INTO post (userIndex, postId, content, date, imgurl)
    VALUES (?, ?, ?, ?, ?)
  `;

    // *유저인덱스 가져오기
    const userIndex = tokenChecker(req, res);
    if (!userIndex) return console.error("토큰이 없습니다.");
    // console.log(userIndex)

    // *현재시간
    const postDate = new Date();
    const formattedDate = `${postDate.getFullYear()}-${
      postDate.getMonth() + 1
    }-${postDate.getDate()} ${postDate.getHours()}:${postDate.getMinutes()}:${postDate.getSeconds()}`;

    // console.log(typeof(formattedDate));

    // *고유한 아이디값 postid에 부여해서 같이 올린게시물 식별하기
    let postId: string;

    try {
      conn = await pool.getConnection();
      const [rows] = await conn.query(
        "SELECT userId FROM user WHERE userIndex = ?",
        [userIndex]
      );
      const generatePostId = (username: string): string => {
        const currentTime: number = new Date().getTime(); // 현재 시간을 밀리초로 변환
        const uniqueString: string = username + currentTime.toString(); // 사용자 이름과 현재 시간을 조합하여 문자열 생성
        const hash: number = hashCode(uniqueString); // 문자열을 해싱하여 고유한 키 생성
        return hash.toString(); // 해싱된 값을 문자열로 반환
      };
      
      // console.log(rows.userId);
      postId = generatePostId(rows.userId);
      // console.log(postId);

      //* 텍스트 내용
      const content = req.body.text;

      //* 업로드된 이미지 정보 가져오기
      const files = (req as any).files as Express.Multer.File[];

      // 이미지 파일들의 URL을 콤마로 연결하여 문자열 형태로 저장
      let imgurls = "";
      files.forEach(async (file, index) => {
        const imageurl = file.originalname;
        imgurls += imageurl;
        if (index < files.length - 1) {
          imgurls += ",";
        }
      });

      await conn.query(insertImagesQuery, [
        userIndex,
        postId,
        content,
        formattedDate,
        imgurls,
      ]);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error uploading feed:", error);
      res.status(500).json({ success: false, error: "Error uploading feed" });
    } finally {
      if (conn) conn.release();
    }
  }
);

export default registerFeed;