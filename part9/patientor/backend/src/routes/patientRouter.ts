import z from "zod";

import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { NewPatientSchema } from "../utils/types.ts";
import type { NewPatient, Patient } from "../utils/types.ts";
import patientService from "../services/patientService.ts";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatient(id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: "Could not find a patient with this id." });
  }
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  },
);

router.use(errorMiddleware);

export default router;
