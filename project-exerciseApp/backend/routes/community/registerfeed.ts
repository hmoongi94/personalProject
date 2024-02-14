import express, { Request, Response } from "express";
import pool from "../../database";
import multer from "multer";
import { tokenChecker } from "../../utils/tokenChecker";

const registerFeed = express();

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

    // * 쿼리문
    const insertImagesQuery = `
    INSERT INTO post (userIndex, content, date, imgurl)
    VALUES (?, ?, ?, ?)
  `;

    // *유저인덱스 가져오기
    const userIndex = tokenChecker(req, res);
    if (!userIndex) return console.error("토큰이 없습니다.");
    // console.log(userIndex)

    // *현재시간
    const postDate = new Date();
    const formattedDate = `${postDate.getFullYear()}-${
      postDate.getMonth() + 1
    }-${postDate.getDate()} ${postDate.getHours()}:${postDate.getMinutes()}`;

    // console.log(typeof(formattedDate));

    //* 텍스트 내용
    const content = req.body.text;

    //* 업로드된 이미지 정보 가져오기
    const files = (req as any).files as Express.Multer.File[];

    // 파일 경로를 DB에 저장
    const imageurls: string[] = [];
    files.forEach(async (file) => {
      const imageurl = file.originalname;

      imageurls.push(imageurl);
    });
    // console.log(imageurls)

    let conn;
    try {
      conn = await pool.getConnection();

      for (const imageurl of imageurls) {
        await conn.query(insertImagesQuery, [
          userIndex,
          content,
          formattedDate,
          imageurl,
        ]);
      }

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
