import express, { Request, Response } from "express";
import pool from "../../database";
import { tokenChecker } from "../../utils/tokenChecker";

const workoutHistory = express();

workoutHistory.post("/workoutHistory", async (req: Request, res: Response) => {
  let conn;

  try {
    // Check for a valid token
    const userIndex = tokenChecker(req, res);
    console.log(userIndex)
    if (!userIndex) return;

    const { date } = req.query;

    // Fetch workout data for the selected date
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT exerciseName, reps, sets FROM record WHERE userIndex = ? AND date = ?",
      [userIndex, date]
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching workout history:", error);
    res.status(500).json({ error: "Error fetching workout history" });
  } finally {
    if (conn) conn.release();
  }
});

export default workoutHistory;