import express from "express";
import pool from "../../database";

const exercisedetail = express();

// :prodIndex 값으로 동적 라우팅하면 그에 맞는 데이터를 보내줌.
exercisedetail.get("/exercisedetail/:exerciseIndex", async (req, res) => {
  let conn;

  // *동적 라우팅 매개변수로 prodIndex값 가져오기
  const exerciseIndex = parseInt(req.params.exerciseIndex, 10);

  try {
    conn = await pool.getConnection();

    // MySQL 쿼리 실행
    const result = await conn.query("SELECT * FROM exercise WHERE `index`=?", [
      exerciseIndex
    ]);

    if (result.length === 0) {
      // 상품이 없을 경우 404 에러 전송
      res.status(404).json({ error: "Product not found" });
    } else {
      // 결과를 클라이언트로 전송
      res.json(result);
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Error fetching product" });
  } finally {
    if (conn) conn.release();
  }
});

export default exercisedetail;
