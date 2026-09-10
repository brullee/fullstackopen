import express from "express";
import patientService from "../services/patientService.ts";
import parseNewDiaryEntry from "../utils/parseNewPatient.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatient());
});

router.post("/", (req, res) => {
  try {
    const newPatientData = parseNewDiaryEntry(req.body);
    const parsedPatientData = patientService.addPatient(newPatientData);
    res.send(parsedPatientData);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
