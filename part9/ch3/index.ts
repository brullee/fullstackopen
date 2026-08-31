import express from "express";
import { calculator, type Operation } from "./calculator.ts";

const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3003;

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: "..." });
  }

  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.send({ result });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
