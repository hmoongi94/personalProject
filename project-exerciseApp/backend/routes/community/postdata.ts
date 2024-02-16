import express from "express";
import pool from "../../database";

const postData = express();

postData.get("/community/postData", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT p.postId, p.content, p.date, p.imgurl, p.userIndex, u.userId, COUNT(l.postIndex) AS likeCount FROM post p JOIN  user u ON p.userIndex = u.userIndex LEFT JOIN `like` l ON p.postIndex = l.postIndex GROUP BY p.postId;"
    );
    console.log(result)
    
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  } finally {  
    if (conn) conn.release();
  }
});

export default postData;
