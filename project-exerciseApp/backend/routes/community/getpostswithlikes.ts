import express from "express";
import pool from "../../database";

const getPostsWithLikes = express();

getPostsWithLikes.get("/community/likes", async (req, res) => {
  let conn;

  try {
    conn = await pool.getConnection();

    // post 테이블과 like 테이블을 조인하여 각 게시물에 대한 좋아요 수를 가져옴
    const [postsWithLikes] = await conn.query(`
      SELECT p.*, COUNT(l.postIndex) AS likeCount
      FROM post p
      LEFT JOIN like l ON p.postIndex = l.postIndex
      GROUP BY p.postId
    `);

    res.status(200).json(postsWithLikes);
  } catch (error) {
    console.error("Error getting posts with likes:", error);
    res.status(500).json({ error: "Error getting posts with likes" });
  } finally {
    if (conn) conn.release();
  }
});

export default getPostsWithLikes;