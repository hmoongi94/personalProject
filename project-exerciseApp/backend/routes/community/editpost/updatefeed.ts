import express from "express";
import pool from "../../../database";
import multer from "multer";
import { tokenChecker } from "../../../utils/tokenChecker";

const updateFeed = express();

// 특정 postId에 해당하는 게시물 데이터 가져오기
updateFeed.post("/community/editFeed/:postId", async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  console.log("Received Content:", content);
  // console.log("Post ID:", postId);

  let conn;
  try {
    conn = await pool.getConnection();
    // postId에 해당하는 게시물 업데이트
    const updateQuery = "UPDATE post SET content = ? WHERE postId = ?";
    await conn.query(updateQuery, [content, postId]);
    // 업데이트된 게시물 다시 불러오기
    const [updatedPost] = await conn.query(
      "SELECT imgurl, content FROM post WHERE postId=?",
      [postId]
    );

    if (!updatedPost) {
      res.status(404).json({ error: "해당하는 게시물이 없습니다." });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("게시물 업데이트 동안 에러가 발생했습니다:", error);
    res
      .status(500)
      .json({ error: "게시물 업데이트 동안 에러가 발생했습니다." });
  } finally {
    if (conn) conn.release();
  }
});

export default updateFeed;
