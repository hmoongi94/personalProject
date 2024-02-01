import express from "express";
import pool from "../../database";

const searchexercisedata = express();

searchexercisedata.get("/searchexercisedata", async (req, res) => {
  let conn;

  // Get the 'query' parameter from the request query string
  const searchData = req.query.query;
  // console.log(searchData);

  try {
    conn = await pool.getConnection();
    if (searchData) {
      const result = await conn.query(
        "SELECT * FROM exercise WHERE name LIKE ? OR category LIKE ?",
        [`%${searchData}%`, `%${searchData}%`]
      );
      console.log(result);
      res.status(200).json(result);
    } else {
      const result = await conn.query("SELECT * FROM exercise", [searchData]);
      console.log(result);
      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Error fetching exercise data:", error);
    res.status(500).json({ error: "Error fetching exercise data" });
  } finally {
    if (conn) conn.release();
  }
});

export default searchexercisedata;
