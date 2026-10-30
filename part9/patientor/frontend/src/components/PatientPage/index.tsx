import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Gender, Patient, Entry, EntryFormValues } from "../../types";
import patientService from "../../services/patients";
import AddEntryModal from "../AddEntryModal";

import { EntryItem } from "../EntryItem";

const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case Gender.Female:
      return <FemaleIcon />;
    case Gender.Male:
      return <MaleIcon />;
    default:
      return <TransgenderIcon />;
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();

  const [formError, setFormError] = useState<string>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setFormError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!id || !patient) return;
    try {
      const newEntry = await patientService.addEntry(id, values);
      setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError<{ error: unknown }>(e)) {
        const error = e.response?.data.error;
        if (Array.isArray(error)) {
          const issues = error as { path: (string | number)[]; message: string }[];
          setFormError(
            issues
              .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
              .join(", "),
          );
        } else if (typeof error === "string") {
          setFormError(error);
        } else {
          setFormError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setFormError("Unknown error");
      }
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        setPatient(await patientService.getById(id));
      } catch {
        setError("Patient not found");
      }
    };
    void fetchPatient();
  }, [id]);

  if (error) return <Typography>{error}</Typography>;
  if (!patient) return <Typography>Loading...</Typography>;

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ marginY: "0.5em" }}>
          {patient.name} <GenderIcon gender={patient.gender} />
        </Typography>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
        <Typography>date of birth: {patient.dateOfBirth}</Typography>
      </Box>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={formError}
        onClose={closeModal}
      />

      <Box>
        <Typography
          variant="h5"
          sx={{ marginTop: "1.5em", marginBottom: "1em" }}
        >
          Entries
        </Typography>
        {patient.entries.length === 0 ? (
          <div>No entries yet.</div>
        ) : (
          patient.entries.map((entry: Entry) => (
            <EntryItem key={entry.id} entry={entry} />
          ))
        )}
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ marginTop: "1.5em" }}
        >
          Add New Entry
        </Button>
      </Box>
    </>
  );
};

export default PatientPage;
