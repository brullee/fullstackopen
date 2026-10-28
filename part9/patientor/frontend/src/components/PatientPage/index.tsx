import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Gender, Patient, Entry } from "../../types";
import patientService from "../../services/patients";

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
      <Box>
        <Typography variant="h5" sx={{ marginY: "1.8em" }}>
          Entries
        </Typography>
        {patient.entries.length === 0 ? (
          <div>There are currently no entries in our systems.</div>
        ) : (
          patient.entries.map((entry: Entry) => (
            <EntryItem key={entry.id} entry={entry} />
          ))
        )}
      </Box>
    </>
  );
};

export default PatientPage;
