import express, { Request, Response } from "express";
import pool from "../../database";
import { tokenChecker } from "../../utils/tokenChecker";

const caloryData = express();

caloryData.post("/workoutHistory/calories", async (req, res) => {
  let conn;

  try {
    // Check for a valid token
    const userIndex = tokenChecker(req, res);
    if (!userIndex) return;

    const { date } = req.query;

    // Fetch calories data for the selected date
    conn = await pool.getConnection();

    const rawData = await conn.query(
      "SELECT e.name, SUM(e.caloryPerReps * r.totalReps) as caloryPerRepsTotal, SUM(r.totalReps) as totalReps, SUM(r.totalSets) as totalSets FROM record r JOIN exercise e ON r.exerciseIndex = e.exerciseIndex WHERE r.userIndex = ? AND r.date = ? GROUP BY e.name",
      [userIndex, date]
    );

    const result = rawData.map(
      (entry: { name: string; caloryPerRepsTotal: number }) => ({
        name: entry.name,
        caloryPerRepsTotal: entry.caloryPerRepsTotal,
      })
    );
    // console.log(result)

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching calories data:", error);
    res.status(500).json({ error: "Error fetching calories data" });
  } finally {
    if (conn) conn.release();
  }
});

export default caloryData;
