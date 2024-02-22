import express from "express";
import pool from "../../../database";

const addCommentData = express();

addCommentData.post("/community/addComment/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params;
  const { commentcontent } = req.body;

  const commentDate = new Date()

  try {
    // 댓글 추가
    const result = await pool.query(
      "INSERT INTO comment (postIndex, commentcontent, userId, commentdate) VALUES ((SELECT postIndex FROM post WHERE postId = ?), ?, ?, ?)",
      [postId, commentcontent, userId, commentDate]
    );

    // 클라이언트에 성공적인 응답 전송
    res.status(200).json({ message: "댓글이 추가되었습니다." });
  } catch (error) {
    // 오류 발생 시 클라이언트에 오류 응답 전송
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "댓글을 추가하는데 실패했습니다." });
  }
});

export default addCommentData;