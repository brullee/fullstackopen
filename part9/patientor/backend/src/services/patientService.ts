import { v1 as uuid } from "uuid";
import patientData from "../data/patients.ts";
import type {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
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

const addEntry = (patientId: string, entry: NewEntry): Entry | undefined => {
  const patient = patients.find((patient) => patient.id === patientId);
  if (!patient) return undefined;
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addEntry,
};
