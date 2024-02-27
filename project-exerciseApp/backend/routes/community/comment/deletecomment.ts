import express from "express";
import pool from "../../../database";

const deleteCommentData = express();

deleteCommentData.delete("/community/deleteComment/:postId/:commentId", async (req, res) => {
  const { postId, commentId } = req.params;
  console.log(commentId)
  try {
    // 댓글 삭제
    const result = await pool.query(
      "DELETE FROM comment WHERE postIndex = (SELECT postIndex FROM post WHERE postId = ?) AND commentIndex = ?",
      [postId, commentId]
    );

    if (result.affectedRows === 0) {
      // 삭제된 행이 없는 경우
      res.status(404).json({ message: "해당 댓글을 찾을 수 없습니다." });
    } else {
      // 성공적으로 삭제된 경우
      res.status(200).json({ message: "댓글이 삭제되었습니다." });
    }
  } catch (error) {
    // 오류 발생 시 클라이언트에 오류 응답 전송
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "댓글을 삭제하는데 실패했습니다." });
  }
});

export default deleteCommentData;