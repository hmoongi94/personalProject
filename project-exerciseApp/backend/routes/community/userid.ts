import express from "express";
import pool from "../../database";
import { tokenChecker } from "../../utils/tokenChecker";

const userId = express();

userId.get("/userId", async (req, res) => {
  const userIndex = tokenChecker(req, res);

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT userId FROM user WHERE userIndex = ?",
      [userIndex]
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  } finally {
    if (conn) conn.release();
  }
});

export default userId;
