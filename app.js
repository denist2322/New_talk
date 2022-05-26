import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const pool = mysql.createPool({
  host: "localhost",
  user: "sm",
  password: "1234",
  database: "talk_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});
const port = 3000;
const app = express();

app.use(express.json());

const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// 조회 ===============================================================

app.get("/todos", async (req, res) => {
  const [[get_rows]] = await pool.query(`
  SELECT * FROM todos ORDER BY RAND() LIMIT 1
  `); // 받은 객체를 get 함수내에서 사용하기 위해서 [[]]를 묶음.

  if (get_rows === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "404 not found",
    });
    return;
  }

  get_rows.hit++;

  await pool.query(
    `UPDATE todos SET 
    hit = ? 
    WHERE id = ?`,
    [get_rows.hit, get_rows.id]
  );

  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: get_rows,
  });
});

// 수정 ==================================================================

app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const [[patch_rows]] = await pool.query(
    `
  SELECT * FROM todos WHERE id = ?
  `,
    [id]
  );

  if (patch_rows === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "404 not found",
    });
    return;
  }

  const {
    autor = patch_rows.autro,
    content = patch_rows.content,
    like_count = patch_rows.like_count,
    dislike_count = patch_rows.dislike_count,
  } = req.body;

  await pool.query(
    `
    UPDATE todos SET
    content = ?, autor = ?, like_count = ?, dislike_count = ?
    WHERE id = ?
    `,
    [content, autor, like_count, dislike_count, id]
  );

  const [[patch_success]] = (`SELECT * FROM todos WHERE id = ?`, [id]);

  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: patch_success,
  });
});

// ==================================================================

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
