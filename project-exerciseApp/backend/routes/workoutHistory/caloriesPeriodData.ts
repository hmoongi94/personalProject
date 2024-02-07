import express from "express";
import pool from "../../database";
import { tokenChecker } from "../../utils/tokenChecker";

const caloryPeriodData = express();

caloryPeriodData.post("/workoutHistory/periodData/calories", async (req, res) => {
  let conn;

  try {
    // Check for a valid token
    const userIndex = tokenChecker(req, res);
    if (!userIndex) return;

    const { startDate, endDate } = req.query;

    // Fetch calories data for the selected date
    conn = await pool.getConnection();

    const rawData = await conn.query(
      "SELECT e.name, SUM(e.caloryPerReps * r.totalReps) as caloryPerRepsTotal, SUM(r.totalReps) as totalReps, SUM(r.totalSets) as totalSets FROM record r JOIN exercise e ON r.exerciseIndex = e.exerciseIndex WHERE r.userIndex = ? AND r.date BETWEEN ? AND ? GROUP BY e.name",
      [userIndex, startDate, endDate]
    );

    const result = rawData.map(
      (entry: { name: string; caloryPerRepsTotal: string }) => ({
        name: entry.name,
        caloryPerRepsTotal: parseInt(entry.caloryPerRepsTotal),
      })
    );
    // console.log(typeof(result[0].caloryPerRepsTotal)) //string으로 나옴
    // string문제 때문에 그래프도 제대로 안나왔었음.

    const totalCaloryPerRepsTotal: number = result.reduce(
      (total: number, entry: { caloryPerRepsTotal: number }) =>
        total + entry.caloryPerRepsTotal,
      0
    );
    // console.log(totalCaloryPerRepsTotal)

    res.status(200).json({ result: result, totalCaloryPerRepsTotal: totalCaloryPerRepsTotal });
  } catch (error) {
    console.error("Error fetching calories data:", error);
    res.status(500).json({ error: "Error fetching calories data" });
  } finally {
    if (conn) conn.release();
  }
});

export default caloryPeriodData;
