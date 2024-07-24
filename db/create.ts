import { Pool } from 'pg';

const pool = new Pool({
  user : "postgres",
  host : 'localhost',
  database : 'shindatabase',
  password : '1234',
  port : 5432,
});

(async () => {
  try {
    // 테이블 생성 쿼리 실행
    await pool.query('CREATE TABLE IF NOT EXISTS user_Test (id SERIAL PRIMARY KEY, password VARCHAR(20) NOT NULL, name VARCHAR(5) NOT NULL, phoneNumber VARCHAR(20) NOT NULL, address VARCHAR(100) NOT NULL, birth DATE NOT NULL, "join" DATE NOT NULL)');
    await pool.query('CREATE TABLE IF NOT EXISTS auth_Test (id BIGINT REFERENCES user_Test(id), Field INTEGER)')
    console.log('테이블 생성 완료.');
  } catch (err) {
    console.error('오류 발생:', err);
  } finally {
    // 연결 해제
    await pool.end();
  }
})();