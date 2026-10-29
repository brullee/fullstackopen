import { useQuery } from "@tanstack/react-query";
import { Entry, Diagnosis } from "../types";
import { Typography } from "@mui/material";

import diagnosisService from "../services/diagnoses";

export const EntryItem = ({ entry }: { entry: Entry }) => {
  const { data: diagnoses } = useQuery({
    queryKey: ["diagnoses"],
    queryFn: diagnosisService.getDiagnoses,
    staleTime: "static",
  });

  return (
    <Typography>
      <b>{entry.date}</b> {entry.description}
      <ul>
        {entry.diagnosisCodes?.map((code: Diagnosis["code"]) => {
          const existingDiagnosis = diagnoses?.find((d) => d.code === code);
          return (
            <li key={code}>
              {code} {existingDiagnosis?.name}
            </li>
          );
        })}
      </ul>
    </Typography>
  );
};
