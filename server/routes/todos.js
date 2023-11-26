const express = require("express");
const { getTodosById } = require("../controllers/todos");

const router = express.Router();

router.get("/todos/:id", getTodosById);

module.exports = router;
