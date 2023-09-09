import { useState } from "react";
import { createNewDiary } from "../reducers/diaryReducer";
import { useAppDispatch, useAppSelector } from "../hooks";
import Notification from "./Notification";

const DiaryForm = () => {
  const diaries = useAppSelector((state) => state.diary);

  const dispatch = useAppDispatch();

  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const createDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary = {
      id: diaries.length + 1,
      date,
      weather,
      visibility,
      comment,
    };

    dispatch(createNewDiary(newDiary));
  };

  return (
    <form onSubmit={createDiary}>
      <Notification />
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
