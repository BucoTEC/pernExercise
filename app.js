import express from "express";
import cors from "cors";
import pool from "./db.js";

// config
const app = express();

app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(200).json("Everithing is working ok");
});

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { desc } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [desc]
    );
    res.json(newTodo.rows);
  } catch (err) {
    console.log(`Ups there was an error: ${err}`);
    res.json(err.message);
  }
});

// GET ALL TODOS
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(`Ups there was an error: ${err}`);
    res.json(err.message);
  }
});

//GET A SINGLE TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT *  FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (err) {
    console.log(`Ups there was an error: ${err}`);
    res.json(err.message);
  }
});

//UPDATE A TODO
app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { desc } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [desc, id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.log(`Ups there was an error: ${err}`);
    res.json(err.message);
  }
});

//DELETE TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json("Todo was deleted");
  } catch (err) {
    console.log(`Ups there was an error: ${err}`);
    res.json(err.message);
  }
});
//start up
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is operational on port: ${port}`);
});
