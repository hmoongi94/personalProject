import express from "express";
import pool from "../../database";

const exercisedata = express();

exercisedata.get("/exercisedata", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT * FROM exercise"
    );
    
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  } finally {  
    if (conn) conn.release();
  }
});

export default exercisedata;
