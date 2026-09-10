import patientData from "../data/patients.ts";
import type { NonSensitivePatient, Patient } from "../types.ts";

const patients: Patient[] = patientData;

const getPatient = (): Patient[] => {
  return patients;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPatient, getNonSensitivePatient };
