const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const redis = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todoCount = Number(await redis.get("added_todos"));
  await redis.set("added_todos", todoCount + 1);
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
});

router.get("/statistics", async (_, res) => {
  const added_todos = await redis.get("added_todos");
  res.send({ added_todos });
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.deleteOne();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  if (req.body.text !== undefined) {
    req.todo.text = req.body.text;
  }
  if (req.body.done !== undefined) {
    req.todo.done = req.body.done;
  }
  await req.todo.save();
  res.send(req.todo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
