import express from "express";
import pool from "../../database";

const registerFeed = express();

registerFeed.post("/community/registerFeed", async (req, res) => {
  console.log(req.headers)

  let conn;
  try {
    conn = await pool.getConnection();
    

  } catch (error) {
    console.error("Error fetching register Feed:", error);
    res.status(500).json({ error: "Error fetching register Feed" });
  } finally {  
    if (conn) conn.release();
  }
});

export default registerFeed;