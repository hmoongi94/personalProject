import express, { Request, Response } from "express";
import pool from "../../database";
import multer from "multer";

const registerFeed = express();

//* 이미지 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/community");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + '.png');
  },
});

const upload = multer({ storage: storage });

registerFeed.post("/community/registerFeed", upload.array("images", 5), async (req: Request, res: Response) => {

  console.log(req.body)
  console.log(req.files)

  let conn;
  try {
    conn = await pool.getConnection();
    res.status(200)
    // 응답
  } catch (error) {
    console.error("Error uploading feed:", error);
    res.status(500).json({ success: false, error: "Error uploading feed" });
  } finally {
    if (conn) conn.release();
  }
});

export default registerFeed;
