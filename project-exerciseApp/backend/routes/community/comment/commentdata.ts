import express from "express";
import pool from "../../../database";

const commentData = express();

commentData.get("/community/commentData", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from comment");
    // console.log(result);
    // 클라이언트에 데이터를 성공적으로 전송
    res.status(200).json(result);
  } catch (error) {
    // 데이터베이스 연결 오류나 쿼리 실행 오류 등의 예외 처리
    console.error("Error fetching likedata:", error);
    // 클라이언트에 오류 메시지를 전송
    res.status(500).json({ error: "Error fetching likedata" });
  }
});

export default commentData;