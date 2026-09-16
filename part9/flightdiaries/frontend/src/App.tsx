import { useState, useEffect } from "react";
import axios from "axios";
import { type DiaryEntry } from "../../backend/src/utils/types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries/sensetive")
      .then((response) => setDiaries(response.data));
  }, []);

  return (
    <div>
      {diaries.map((diary) => (
        <ul key={diary.id}>
          <li>{diary.weather}</li>
          <li>{diary.visibility}</li>
          <li>{diary.date}</li>
          {diary.comment && <li>{diary.comment}</li>}
        </ul>
      ))}
    </div>
  );
};

export default App;
