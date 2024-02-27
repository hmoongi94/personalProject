import express from "express";
import pool from "../../database";

const postData = express();

postData.get("/community/postData", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT p.date, p.postId, p.content, p.imgurl, p.userIndex, u.userId, " +
        "(SELECT COUNT(*) FROM `like` l WHERE p.postIndex = l.postIndex) AS likeCount, " +
        "(SELECT GROUP_CONCAT(c.commentcontent) FROM comment c WHERE p.postIndex = c.postIndex) AS commentContents, " +
        "(SELECT GROUP_CONCAT(c.commentdate) FROM comment c WHERE p.postIndex = c.postIndex) AS commentDates, " +
        "(SELECT GROUP_CONCAT(c.userId) FROM comment c WHERE p.postIndex = c.postIndex) AS commentuserId, " +
        "(SELECT GROUP_CONCAT(c.commentIndex) FROM comment c WHERE p.postIndex = c.postIndex) AS commentIndexes " +
        "FROM post p " +
        "JOIN user u ON p.userIndex = u.userIndex " +
        "GROUP BY p.postId, p.date, p.content, p.imgurl, p.userIndex, u.userId " +
        "ORDER BY p.postIndex;"
    );
    // console.log(result)

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  } finally {
    if (conn) conn.release();
  }
});

export default postData;
