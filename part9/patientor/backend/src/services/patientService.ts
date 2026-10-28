import { v1 as uuid } from "uuid";
import patientData from "../data/patients.ts";
import type {
  Patient,
  NonSensitivePatient,
  NewPatient,
} from "../utils/types.ts";

const patients: Patient[] = patientData;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const requestedPatient = patients.find((p) => p.id === id);
  return requestedPatient;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatient,
  addPatient,
};
