import express from "express";
import { parseInput, calculateBmi, handleError } from "./bmiCalculator.ts";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

// http://localhost:3003/bmi?height=180&weight=72
app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = parseInput(req.query.height, req.query.weight);
    const bmiResult = calculateBmi(height, weight);
    res.json({
      weight: weight,
      height: height / 0.01,
      bmi: bmiResult,
    });
  } catch (error: unknown) {
    res.json({ error: handleError(error) });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
