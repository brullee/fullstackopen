import { useState, useEffect } from "react";
import axios from "axios";
import { type NonSensitiveDiaryEntry } from "../../backend/src/utils/types";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<NonSensitiveDiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => setDiaries(response.data));
  }, []);

  return (
    <div>
      {diaries.map((diary) => (
        <ul key={diary.id}>
          <li>{diary.weather}</li>
          <li>{diary.visibility}</li>
          <li>{diary.date}</li>
        </ul>
      ))}
    </div>
  );
};

export default App;
