import express from "express";
import pool from "../../database";
import { tokenChecker } from "../../utils/tokenChecker";

const recordData = express();

recordData.post("/recordData", async (req, res) => {
  // * 토큰 있는지 확인하는 로직
  const userIndex = tokenChecker(req, res);

  const { totalReps, selectedExercise, executionCount } = req.body;

  let conn;

  try {
    conn = await pool.getConnection();

    // * 선택한 운동에 대한 exerciseIndex 찾기
    const exerciseIndexResult = await conn.query(
      "SELECT exerciseIndex FROM exercise WHERE name = ?",
      [selectedExercise]
    );

    if (!exerciseIndexResult || exerciseIndexResult.length === 0) {
      return res.status(404).json({ error: "Selected exercise not found" });
    }

    const exerciseIndex = exerciseIndexResult[0].exerciseIndex;
    // console.log(exerciseIndex);

    // * 현재 날짜 및 시간을 생성 (년 월 일 형식)
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString()

    // * record 테이블에 insert
    const insertResult = await conn.query(
      "INSERT INTO record (userIndex, exerciseIndex, totalReps, totalSets, date) VALUES (?, ?, ?, ?, ?)",
      [userIndex, exerciseIndex, totalReps, executionCount, formattedDate]
    );

    res.status(200).json({ success: true, message: "Recorded successfully" });
  } catch (error) {
    console.error("Error inserting records:", error);
    res.status(500).json({ error: "Error inserting records" });
  } finally {
    if (conn) conn.release();
  }
});

export default recordData;
