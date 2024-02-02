import express from "express";
import pool from "../../database";

const recordData = express();

recordData.post("/recordData", async (req, res) => {
  let conn;
  
  const { totalReps, selectedExercise, executionCount } = req.body;
  console.log(totalReps)
  console.log(selectedExercise)
  console.log(executionCount)

  // * record 테이블에 insert
  try {
    conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM exercise");

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  } finally {
    if (conn) conn.release();
  }
});

export default recordData;
