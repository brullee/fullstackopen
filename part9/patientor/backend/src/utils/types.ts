import z from "zod";

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});
export type Diagnosis = z.infer<typeof DiagnosisSchema>;

export const GenderSchema = z.enum(["male", "female", "other"]);
export type Gender = z.infer<typeof GenderSchema>;

export const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional(),
});
export type BaseEntry = z.infer<typeof BaseEntrySchema>;

const HealthCheckRatingTable = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export const HealthCheckRatingSchema = z.union([
  z.literal(HealthCheckRatingTable.Healthy),
  z.literal(HealthCheckRatingTable.LowRisk),
  z.literal(HealthCheckRatingTable.HighRisk),
  z.literal(HealthCheckRatingTable.CriticalRisk),
]);

export type HealthCheckRating = z.infer<typeof HealthCheckRatingSchema>;

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingSchema,
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z
    .object({ date: z.iso.date(), criteria: z.iso.date() })
    .optional(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({ startDate: z.iso.date(), endDate: z.iso.date() })
    .optional(),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);
export type NewEntry = z.infer<typeof NewEntrySchema>;

export type Entry = NewEntry & { id: string };

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: GenderSchema,
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

// // Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown
//   ? Omit<T, K>
//   : never;
// // Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, "id">;
