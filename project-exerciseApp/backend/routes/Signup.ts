import express from "express";
import pool from "../database";

const customerSignup = express();

//* 회원가입 엔드포인트
customerSignup.post("/signup", async (req, res) => {
  let conn;
  const { userId, userPassword, userPassword1, userEmail, userPhoneNumber } =
    req.body;
  // console.log(userPhoneNumber);

  // userPassword와 userPassword1이 다를 경우 예외 처리
  if (userPassword !== userPassword1) {
    return res
      .status(250)
      .json({ success: false, message: "비밀번호가 일치하지 않습니다." });
  }

  if (userPhoneNumber.length > 12) {
    return res
      .status(251)
      .json({ success: false, message: "전화번호를 제대로 입력해주세요." });
  }

    // 이메일 형식 검사
    if (!isValidEmail(userEmail)) {
      return res
        .status(253)
        .json({ success: false, message: "올바른 이메일 형식을 입력해주세요." });
    }  

  try {
    conn = await pool.getConnection();

     // 아이디가 이미 존재하는지 확인하는 쿼리 실행
     const [existingUser] = await conn.query(
      "SELECT * FROM user WHERE userId = ?",
      [userId]
    );
    console.log(existingUser)

    // 이미 존재하는 아이디인 경우 회원가입 막기
    if (existingUser && [existingUser].length > 0) {
      return res
        .status(252)
        .json({ success: false, message: "이미 존재하는 아이디입니다." });
    }

    await conn.query(
      "INSERT INTO user (userId, userPassword, email, phonenumber) VALUES (?, ?, ?, ?)",
      [userId, userPassword, userEmail, userPhoneNumber]
    );

    res
      .status(201)
      .json({ success: true, message: "회원가입이 완료되었습니다." });
  } catch (error) {
    console.error("Error during signup:", error);
    res
      .status(500)
      .json({ success: false, message: "회원가입 중 오류가 발생했습니다." });
  } finally {
    if (conn) conn.release();
  }
});

export default customerSignup;

// 이메일 형식 검사 함수
function isValidEmail(email: string) {
  // 간단한 이메일 형식 검사 로직
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}