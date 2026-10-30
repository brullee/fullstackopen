import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRatingString, setHealthCheckRatingString] = useState("");
  const [diagnosisCodesString, setDiagnosisCodesString] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const healthCheckRating = Number(healthCheckRatingString) as HealthCheckRating;
    const diagnosisCodes = diagnosisCodesString
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code.length > 0);
    onSubmit({
      date,
      description,
      specialist,
      diagnosisCodes,
      type: "HealthCheck",
      healthCheckRating,
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
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
          label="Health Check Rating (0 - 3)"
          required
          fullWidth
          value={healthCheckRatingString}
          onChange={({ target }) => setHealthCheckRatingString(target.value)}
        />

        <TextField
          label="Diagnosis Codes (comma-separated)"
          fullWidth
          value={diagnosisCodesString}
          onChange={({ target }) => setDiagnosisCodesString(target.value)}
        />

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
