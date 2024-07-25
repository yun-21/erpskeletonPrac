import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

dotenv.config({ path: `${__dirname}/../../.env` });

const pool = new Pool({
  user: "postgres",
  host: 'localhost',
  database : 'shindatabase',
  password: '1234',
  port: 5432,
});

const port = process.env.PORT || 3001; // 기본 포트 설정 추가
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'user_test'
      AND column_name NOT IN ('id')
    `);
    console.log(result.rows); // 데이터 확인을 위해 로그 출력
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/send', async (req, res) => {
  const { birth, join, address, phonenumber, password, name } = req.body;
  const values = [birth, join, address, phonenumber, password, name];

  const client = await pool.connect(); // 연결을 기다림
  try {
    await client.query('INSERT INTO user_test(birth, "join", address, phonenumber, password, name) VALUES($1,$2,$3,$4,$5,$6)', values);
    console.log(`'${values}' 추가 완료`);
  } catch (err) {
    console.error('쿼리 실행 오류:', err);
  } finally {
    client.release(); // 연결 종료
  }
});

app.post('/select', async (req, res) => {
  const {name, field} = req.body;
  const client = await pool.connect(); 
  try {
    const result = await client.query(`
      SELECT id
      FROM user_test
      WHERE name =$1
    `,[name]);
    console.log(result.rows)
    if(result.rows.length>0){
      const userId = result.rows[0].id;
      await client.query('INSERT INTO auth_test(id, field) VALUES($1, $2)', [userId, field]);
      res.json({message: '존재하고 권한 부여 완료'});
    }else{
      res.json({message : "존재안함"});
    }
  } catch (error) {
    console.error('사용자 조회 실패:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    client.release(); // 연결 종료
  }
})
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});