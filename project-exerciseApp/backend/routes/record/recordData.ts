import express from "express";
import pool from "../../database";
import { tokenChecker } from "../../utils/tokenChecker";

const recordData = express();

recordData.post("/recordData", async (req, res) => {

  // * 토큰 있는지 확인하는 로직
  const userIndex = tokenChecker(req, res);
  console.log(userIndex)
  if (!userIndex) return console.error("토큰이 없습니다.");

  const { totalReps, selectedExercise, executionCount } = req.body;
  console.log(totalReps);
  console.log(selectedExercise);
  console.log(executionCount);

  let conn;

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
