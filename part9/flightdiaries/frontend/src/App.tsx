import { useState, useEffect } from "react";
import axios from "axios";
import {
  type DiaryEntry,
  Visibility,
  Weather,
} from "../../backend/src/utils/types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>();
  const [weather, setWeather] = useState<Weather>();
  const [comment, setComment] = useState("");
  const [errorMsg, setError] = useState("");

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries/sensetive")
      .then((response) => setDiaries(response.data.reverse()));
  }, []);

  const newFlightEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios
        .post<DiaryEntry>("http://localhost:3000/api/diaries", {
          date: date,
          weather: weather,
          visibility: visibility,
          comment: comment,
        })
        .then((response) => setDiaries([response.data, ...diaries]));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        const errorTemplate = "Error: ";
        setError(errorTemplate + error.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      {errorMsg && <h4 style={{ color: "red" }}>{errorMsg}</h4>}
      <form onSubmit={newFlightEntry}>
        date
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        visibility
        {Object.values(Visibility).map((value) => (
          <span key={value} style={{ marginLeft: "0.5em" }}>
            {value}
            <input
              type="radio"
              name="visibility"
              checked={visibility === value}
              onChange={() => setVisibility(value)}
            />
          </span>
        ))}
        <br />
        weather
        {Object.values(Weather).map((value) => (
          <span key={value} style={{ marginLeft: "0.5em" }}>
            {value}
            <input
              type="radio"
              name="weather"
              checked={weather === value}
              onChange={() => setWeather(value)}
            />
          </span>
        ))}
        <br />
        comment
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          weather: {diary.weather}
          <br />
          visibility: {diary.visibility} <br />
          {diary.comment && <>comment: {diary.comment}</>}
        </div>
      ))}
    </div>
  );
};

export default App;
