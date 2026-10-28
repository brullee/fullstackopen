import { Entry, Diagnosis } from "../types";

export const EntryItem = ({ entry }: { entry: Entry }) => (
  <div>
    <b>{entry.date}</b> {entry.description}
    <ul>
      {entry.diagnosisCodes?.map((code: Diagnosis["code"]) => (
        <li key={code}>{code}</li>
      ))}
    </ul>
  </div>
);
