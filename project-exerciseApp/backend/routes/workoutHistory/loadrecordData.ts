import express, { Request, Response } from "express";
import pool from "../../database";
import { tokenChecker } from "../../utils/tokenChecker";

const workoutHistory = express();

workoutHistory.post("/workoutHistory", async (req: Request, res: Response) => {
  let conn;

  try {
    // Check for a valid token
    const userIndex = tokenChecker(req, res);
    console.log(userIndex);
    if (!userIndex) return;

    const { date } = req.query;

    // Fetch workout data for the selected date
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT e.name, r.totalReps, r.totalSets FROM record r JOIN exercise e ON r.exerciseIndex = e.exerciseIndex WHERE r.userIndex = ? AND r.date = ?",
      [userIndex, date]
    );
    console.log(result)

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching workout history:", error);
    res.status(500).json({ error: "Error fetching workout history" });
  } finally {
    if (conn) conn.release();
  }
});

export default workoutHistory;
