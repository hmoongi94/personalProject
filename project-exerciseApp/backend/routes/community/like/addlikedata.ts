import express from "express";
import pool from "../../../database";

const addLikeData = express();

// POST 요청 처리
addLikeData.post("/community/addLikeData/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params;;

  try {
    // 좋아요 정보 추가
    const result = await pool.query("INSERT INTO `like` (postIndex, userIndex) VALUES ((SELECT postIndex FROM post WHERE postId = ?), (SELECT userIndex FROM user WHERE userId = ?))", [postId, userId]);

    console.log(result);

    // 클라이언트에 성공적인 응답 전송
    res.status(200).json({ message: "좋아요 정보가 추가되었습니다." });
  } catch (error) {
    // 오류 발생 시 클라이언트에 오류 응답 전송
    console.error("Error adding like data:", error);
    res.status(500).json({ error: "좋아요 정보를 추가하는데 실패했습니다." });
  }
});

export default addLikeData;