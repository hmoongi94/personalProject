import mariadb from "mariadb";
import dotenv from "dotenv"

dotenv.config();

// MariaDB 연결 풀 설정
const pool = mariadb.createPool({
  // 집에서 하기 위해 잠깐 바꿧습니다.
  host: process.env.db_host,
  port: 3306,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
  connectionLimit: 5,
  supportBigNumbers: true,
  bigNumberStrings: true,
});

export default pool;
