import { useState } from "react";
import { addDiary } from "../diaryService";
import { DiaryEntry } from "../types";

const DiaryForm = ({ diaries }: { diaries: DiaryEntry[] }) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const createDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const details = await addDiary({
      id: diaries.length + 1,
      date,
      weather,
      visibility,
      comment,
    });

    console.log(details);
  };

  return (
    <form onSubmit={createDiary}>
      <div>
        <label>
          date
          <input
            type="text"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          weather
          <input
            type="text"
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          visibility
          <input
            type="text"
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          comment
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </label>
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default DiaryForm;
