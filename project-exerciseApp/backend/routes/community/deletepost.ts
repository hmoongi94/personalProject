import express from "express";
import pool from "../../database";

const deletePost = express();

deletePost.get("/community/deletepost/:postId", async (req, res) => {
  let conn;

  // *동적 라우팅 매개변수로 prodIndex값 가져오기
  const postId = parseInt(req.params.postId, 10);

  try {
    conn = await pool.getConnection();

    // MySQL 쿼리 실행하여 해당 postId에 해당하는 포스트 삭제
    const result = await conn.query("DELETE FROM post WHERE postId = ?", [
      postId,
    ]);

    // 삭제 결과 확인 후 클라이언트로 응답
    if (result.affectedRows === 0) {
      // 삭제된 행이 없을 경우 404 에러 전송
      res.status(404).json({ error: "Post not found" });
    } else {
      // 삭제 성공 시 200 OK 응답 전송
      res.status(200).json({ message: "Post deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting Post:", error);
    res.status(500).json({ error: "Error deleting Post" });
  } finally {
    if (conn) conn.release();
  }
});

export default deletePost;
