import express from "express";
import pool from "../../../database";

const likeData = express();

likeData.get("/community/likeData", async (req, res) => {
  try {
    // SQL 쿼리에서 백틱을 사용하여 예약어인 like를 테이블 이름으로 사용할 수 있게 함
    const result = await pool.query("SELECT p.postId, u.userId FROM `like` l JOIN post p ON l.postIndex = p.postIndex JOIN user u ON l.userIndex = u.userIndex;");
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

export default likeData;