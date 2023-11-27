const express = require("express");
const {
  getTodosById,
  getUserByEmail,
  getUserById,
  getSharedTodoById,
  createTodo,
  deleteTodo,
  shareTodo,
  toggleCompleted,
} = require("../controllers/todos");

const router = express.Router();

router.get("/todos/:id", getTodosById);
router.get("/todos-by-email", getUserByEmail);
router.get("/todos/shared-todo/:id", getSharedTodoById);
router.post("/todos/create", createTodo);
router.get("/user/:id", getUserById);
router.delete("/todos/delete/:id", deleteTodo);
router.post("/todos/shared-todo", shareTodo);
router.put("/todos/:id", toggleCompleted);

module.exports = router;
