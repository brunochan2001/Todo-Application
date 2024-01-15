const response = require("express");
const { dbConnection } = require("../database/config");

const getTodosById = async (req, res = response) => {
  const id = req.params.id;
  try {
    const connection = dbConnection();
    const [row] = await connection.promise().query(
      `SELECT todos.*, shared_todos.shared_with_id 
      FROM todos
      LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
      WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?
      `,
      [id, id]
    );
    const todosById = row;
    if (todosById.length) {
      res.status(200).json({ ok: true, data: todosById });
    } else {
      res.status(404).json({ ok: false, error: "No existe todos por el id" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error al obtener todos" });
  }
};

const getTodo = async (req, res = response) => {
  const id = req.params.id;
  try {
    const connection = dbConnection();
    const [rows] = await connection
      .promise()
      .query(`SELECT * FROM todos WHERE id = ?`, [id]);
    const todo = rows[0];
    res.status(200).json({ ok: true, data: todo });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error al obtener todos" });
  }
};

const getSharedTodoById = async (req, res = response) => {
  try {
    const id = req.params.id;
    const connection = dbConnection();
    const [rows] = await connection
      .promise()
      .query(`SELECT * FROM shared_todos WHERE todo_id = ?`, [id]);
    const sharedTodo = rows[0];
    const [authorRows] = await connection
      .promise()
      .query(`SELECT * FROM users WHERE id = ?`, [sharedTodo.user_id]);
    const [sharedWithRows] = await connection
      .promise()
      .query(`SELECT * FROM users WHERE id = ?`, [sharedTodo.shared_with_id]);
    const author = authorRows[0];
    const sharedWith = sharedWithRows[0];
    if (sharedTodo) {
      res
        .status(200)
        .json({ ok: true, data: { author, shared_with: sharedWith } });
    } else {
      res
        .status(404)
        .json({ ok: false, error: "No existe el todo compartido" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error al compartir Todo" });
  }
};

const getUserById = async (req, res = response) => {
  try {
    const id = req.params.id;
    const connection = dbConnection();
    const [rows] = await connection.promise().query(
      `
      SELECT * FROM users WHERE id = ?`,
      [id]
    );
    const user = rows[0];
    if (user) {
      res.status(200).json({ ok: true, data: user });
    } else {
      res.status(404).json({ ok: false, error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error al obtener usuario" });
  }
};

const getUserByEmail = async (req, res = response) => {
  const email = req.body.email;
  try {
    const connection = dbConnection();
    const [rows] = await connection
      .promise()
      .query(`SELECT * FROM users WHERE email = ?`, [email]);

    const user = rows[0];
    if (user) {
      res.status(200).json({ ok: true, data: user });
    } else {
      res.status(404).json({ ok: false, error: "No existe el usuario" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, error: "Error al obtener usuario por email" });
  }
};

const createTodo = async (req, res = response) => {
  const user_id = req.body.user_id;
  const title = req.body.title;
  try {
    const connection = dbConnection();
    const [result] = await connection.promise().query(
      `INSERT INTO todos (user_id, title)
        VALUES (?, ?)`,
      [user_id, title]
    );
    const todoID = result.insertId;
    const todo = await getTodo({ params: { id: todoID } }, res);
    if (!res.headersSent) {
      res.status(201).json({ ok: true, data: todo });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ ok: false, error: "Error al crear todo" });
    }
  }
};

const deleteTodo = async (req, res = response) => {
  const id = req.params.id;
  try {
    const connection = dbConnection();
    const [result] = await connection
      .promise()
      .query(`DELETE FROM todos WHERE id= ?;`, [id]);
    res.status(201).json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error al eliminar todo" });
  }
};

const toggleCompleted = async (req, res = response) => {
  const status = req.body.status;
  const id = req.params.id;
  try {
    const connection = dbConnection();
    const newStatus = status === true ? "TRUE" : "FALSE";

    const [result] = await connection.promise().query(
      `UPDATE todos SET completed = ${newStatus}
        WHERE id = ?`,
      [id]
    );
    res.status(201).json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error al completar todo" });
  }
};

const shareTodo = async (req, res = response) => {
  const todo_id = req.body.todo_id;
  const user_id = req.body.user_id;
  const email = req.body.email;

  try {
    const connection = dbConnection();

    const [shared_with] = await connection
      .promise()
      .query(`SELECT * FROM users WHERE email = ?`, [email]);

    const shared_with_id = shared_with[0].id;
    const [result] = await connection.promise().query(
      `INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
       VALUES (?,?,?)`,
      [todo_id, user_id, shared_with_id]
    );
    res.status(201).json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error al compartir todo" });
  }
};

const createUser = async (req, res = response) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  try {
    const connection = dbConnection();
    const [result] = await connection.promise().query(
      `INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)`,
      [name, email, password]
    );
    const usersId = result.insertId;
    res.status(201).json({ ok: true, data: { user_id: usersId } });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error al crear todo" });
  }
};

const signInUser = async (req, res = response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const connection = dbConnection();
    const [result] = await connection
      .promise()
      .query("SELECT * FROM users WHERE email = ? AND password = ?", [
        email,
        password,
      ]);
    if (result.length > 0) {
      res.status(201).json({ ok: true, data: result[0] });
    } else {
      res.status(401).json({ ok: false, error: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error al crear todo" });
  }
};

module.exports = {
  getTodosById,
  getUserByEmail,
  getUserById,
  getSharedTodoById,
  createTodo,
  deleteTodo,
  shareTodo,
  toggleCompleted,
  createUser,
  signInUser,
};
