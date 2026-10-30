import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { Entry, EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

type EntryType = Entry["type"];

const entryTypeOptions: { value: EntryType; label: string }[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" },
];

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodesString, setDiagnosisCodesString] = useState("");

  const [healthCheckRatingString, setHealthCheckRatingString] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    const option = entryTypeOptions.find((o) => o.value === event.target.value);
    if (option) {
      setType(option.value);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const diagnosisCodes = diagnosisCodesString
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code.length > 0);
    const base = { date, description, specialist, diagnosisCodes };

    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...base,
          type,
          healthCheckRating: Number(
            healthCheckRatingString,
          ) as HealthCheckRating,
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...base,
          type,
          employerName,
          sickLeave:
            sickLeaveStart || sickLeaveEnd
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
        });
        break;
      case "Hospital":
        onSubmit({
          ...base,
          type,
          discharge:
            dischargeDate || dischargeCriteria
              ? { date: dischargeDate, criteria: dischargeCriteria }
              : undefined,
        });
        break;
      default:
        assertNever(type);
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>Entry type</InputLabel>
        <Select fullWidth value={type} onChange={onTypeChange}>
          {entryTypeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Date"
          required
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          required
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          required
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis Codes (comma-separated)"
          fullWidth
          value={diagnosisCodesString}
          onChange={({ target }) => setDiagnosisCodesString(target.value)}
        />

        {type === "HealthCheck" && (
          <TextField
            label="Health Check Rating (0 - 3)"
            required
            fullWidth
            value={healthCheckRatingString}
            onChange={({ target }) => setHealthCheckRatingString(target.value)}
          />
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer"
              required
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              label="Sick leave end"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </>
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
