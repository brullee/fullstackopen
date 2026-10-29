import { useQuery } from "@tanstack/react-query";
import {
  Entry,
  Diagnosis,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";

import diagnosisService from "../services/diagnoses";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const HospitalDetails = ({ entry }: { entry: HospitalEntry }) =>
  entry.discharge ? (
    <Typography>
      discharged {entry.discharge.date}: {entry.discharge.criteria}
    </Typography>
  ) : null;

const OccupationalHealthcareDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) =>
  entry.sickLeave ? (
    <Typography>
      sick leave {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
    </Typography>
  ) : null;

const HEALTH_COLORS = ["green", "yellow", "orange", "red"];

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => (
  <FavoriteIcon sx={{ color: HEALTH_COLORS[entry.healthCheckRating] }} />
);

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const EntryIcon = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <LocalHospitalIcon />;
    case "OccupationalHealthcare":
      return <WorkIcon />;
    case "HealthCheck":
      return <MedicalServicesIcon />;
    default:
      return assertNever(entry);
  }
};

export const EntryItem = ({ entry }: { entry: Entry }) => {
  const { data: diagnoses } = useQuery({
    queryKey: ["diagnoses"],
    queryFn: diagnosisService.getDiagnoses,
    staleTime: "static",
  });

  return (
    <Box sx={{ border: 1, borderRadius: 1, padding: 1, marginBottom: 1 }}>
      <Typography>
        {entry.date} <EntryIcon entry={entry} />{" "}
        {entry.type === "OccupationalHealthcare" && <i>{entry.employerName}</i>}
      </Typography>
      <Typography>
        <i>{entry.description}</i>
      </Typography>
      {entry.diagnosisCodes?.length ? (
        <ul>
          {entry.diagnosisCodes.map((code: Diagnosis["code"]) => {
            const existingDiagnosis = diagnoses?.find((d) => d.code === code);
            return (
              <li key={code}>
                {code} {existingDiagnosis?.name}
              </li>
            );
          })}
        </ul>
      ) : null}
      <EntryDetails entry={entry} />
      <Typography>diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};
