import { useState, SyntheticEvent } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  TextField,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  Box,
  Chip,
} from "@mui/material";

import { Entry, EntryFormValues, HealthCheckRating } from "../../types";
import diagnosisService from "../../services/diagnoses";

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

const ratingOptions = Object.entries(HealthCheckRating).map(([key, value]) => ({
  value,
  label: `${value} - ${key.replace(/([A-Z])/g, " $1").trim()}`,
}));

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const { data: diagnoses } = useQuery({
    queryKey: ["diagnoses"],
    queryFn: diagnosisService.getDiagnoses,
    staleTime: "static",
  });

  const [type, setType] = useState<EntryType>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [diagnosisMenuOpen, setDiagnosisMenuOpen] = useState(false);

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

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

  const onRatingChange = (event: SelectChangeEvent<number>) => {
    const option = ratingOptions.find(
      (o) => o.value === Number(event.target.value),
    );
    if (option) {
      setHealthCheckRating(option.value);
    }
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
    setDiagnosisMenuOpen(false);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const base = { date, description, specialist, diagnosisCodes };

    switch (type) {
      case "HealthCheck":
        onSubmit({ ...base, type, healthCheckRating });
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

  // label sits above the field, so it doesn't overlap the browser's dd.mm.yyyy hint
  const dateLabel = { inputLabel: { shrink: true } };

  return (
    <div>
      <form onSubmit={addEntry}>
        <FormControl fullWidth margin="dense">
          <InputLabel id="entry-type-label">Entry type</InputLabel>
          <Select
            labelId="entry-type-label"
            label="Entry type"
            value={type}
            onChange={onTypeChange}
          >
            {entryTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Date"
          type="date"
          required
          fullWidth
          margin="dense"
          slotProps={dateLabel}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          required
          fullWidth
          margin="dense"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          required
          fullWidth
          margin="dense"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            label="Diagnosis codes"
            multiple
            open={diagnosisMenuOpen}
            onOpen={() => setDiagnosisMenuOpen(true)}
            onClose={() => setDiagnosisMenuOpen(false)}
            value={diagnosisCodes}
            onChange={onDiagnosisCodesChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((code) => (
                  <Chip key={code} label={code} />
                ))}
              </Box>
            )}
          >
            {diagnoses?.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} - {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === "HealthCheck" && (
          <FormControl fullWidth margin="dense">
            <InputLabel id="rating-label">Health Check Rating</InputLabel>
            <Select
              labelId="rating-label"
              label="Health Check Rating"
              value={healthCheckRating}
              onChange={onRatingChange}
            >
              {ratingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer"
              required
              fullWidth
              margin="dense"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start"
              type="date"
              fullWidth
              margin="dense"
              slotProps={dateLabel}
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              label="Sick leave end"
              type="date"
              fullWidth
              margin="dense"
              slotProps={dateLabel}
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </>
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge date"
              type="date"
              fullWidth
              margin="dense"
              slotProps={dateLabel}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              margin="dense"
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
