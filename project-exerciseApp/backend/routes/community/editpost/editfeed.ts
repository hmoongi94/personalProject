import express from "express";
import pool from "../../../database";
import { tokenChecker } from "../../../utils/tokenChecker";

const editFeed = express();

// 특정 postId에 해당하는 게시물 데이터 가져오기
editFeed.post("/community/editFeed/:postId", async (req, res) => {
  const { postId } = req.params;
  console.log(postId)

  let conn;
  try {
    conn = await pool.getConnection();
    const [post] = await conn.query("SELECT imgurl, content FROM post WHERE postId=?", [postId]);

    if (!post) {
      res.status(404).json({ error: "해당하는 게시물이 없습니다." });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("게시물 데이터를 불러오는 동안 에러가 발생했습니다:", error);
    res.status(500).json({ error: "게시물 데이터를 불러오는 동안 에러가 발생했습니다." });
  } finally {
    if (conn) conn.release();
  }
});

export default editFeed;