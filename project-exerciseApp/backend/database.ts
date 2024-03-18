import mariadb from "mariadb";

// MariaDB 연결 풀 설정
const pool = mariadb.createPool({
  // 집에서 하기 위해 잠깐 바꿧습니다.
  host: "database-1-exerciseapp.cf6owgsqevie.ap-northeast-2.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "Rlawjdgml12!",
  database: "personalproject_1",
  connectionLimit: 5,
  supportBigNumbers: true,
  bigNumberStrings: true,
});

export default pool;
