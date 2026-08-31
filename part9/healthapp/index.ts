import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { handleError } from "./utils.ts";
import { parseInput, calculateBmi } from "./bmiCalculator.ts";
import { parseBody, calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

// http://localhost:3003/bmi?height=180&weight=72
app.get("/bmi", (req, res) => {
  const { height, weight } = parseInput(req.query.height, req.query.weight);
  const bmiResult = calculateBmi(height, weight);
  res.send({
    weight: weight,
    height: height / 0.01,
    bmi: bmiResult,
  });
});

// http://localhost:3003/exercises
// with json req body
app.post("/exercises", (req, res) => {
  const { hoursPerDay, targetHours } = parseBody(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    req.body.daily_exercises,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    req.body.target,
  );

  const result = calculateExercises(hoursPerDay, targetHours);
  res.json({ ...result });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  res.status(400).json({ error: handleError(err) });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
