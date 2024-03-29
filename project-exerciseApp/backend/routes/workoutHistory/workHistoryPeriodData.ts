import express, { Request, Response } from "express";
import pool from "../../database";
import { tokenChecker } from "../../utils/tokenChecker";

const workoutHistoryPeriodData = express();

workoutHistoryPeriodData.post(
  "/workoutHistory/periodData",
  async (req: Request, res: Response) => {
    let conn;

    try {
      // Check for a valid token
      const userIndex = tokenChecker(req, res);
      // console.log(userIndex);
      if (!userIndex) return;

      const { startDate, endDate } = req.query;

      // Fetch workout data for the selected date
      conn = await pool.getConnection();

      interface GroupedEntry {
        name: string;
        totalReps: number;
        totalWeights: number;
        totalSets: number;
      }

      const rawData = await conn.query(
        "SELECT e.name, e.caloryPerReps, r.totalReps, r.totalWeights, r.totalSets FROM record r JOIN exercise e ON r.exerciseIndex = e.exerciseIndex WHERE r.userIndex = ? AND r.date BETWEEN ? AND ?",
        [userIndex, startDate, endDate]
      );
      // console.log(rawData);

      const result: GroupedEntry[] = rawData.reduce(
        (acc: GroupedEntry[], entry: GroupedEntry) => {
          const existingEntry = acc.find((group) => group.name === entry.name);

          if (existingEntry) {
            existingEntry.totalReps += entry.totalReps;
            existingEntry.totalWeights += entry.totalWeights;
            existingEntry.totalSets += entry.totalSets;
          } else {
            acc.push({
              name: entry.name,
              totalReps: entry.totalReps,
              totalWeights: entry.totalWeights,
              totalSets: entry.totalSets,
            });
          }

          return acc;
        },
        []
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching workout history:", error);
      res.status(500).json({ error: "Error fetching workout history" });
    } finally {
      if (conn) conn.release();
    }
  }
);

export default workoutHistoryPeriodData;
