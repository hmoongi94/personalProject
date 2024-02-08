import express from "express";
import pool from "../../database";

const postData = express();

postData.get("/community/postData", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT post.content, post.date, post.imgurl, user.userId FROM post JOIN user ON post.userIndex = user.userIndex"
    );
    
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  } finally {  
    if (conn) conn.release();
  }
});

export default postData;
