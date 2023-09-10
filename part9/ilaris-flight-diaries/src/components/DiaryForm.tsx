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

  const handleWeather = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value);
  };

  const handleVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value);
  };

  const createDiary = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newDiary = {
      id: diaries.length + 1,
      date,
      weather,
      visibility,
      comment,
    };

    await dispatch(createNewDiary(newDiary));

    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  return (
    <form onSubmit={createDiary}>
      <Notification />
      <div>
        <label>
          date
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          weather{" "}
          <label>
            sunny
            <input
              name="weather"
              type="radio"
              value="sunny"
              onChange={handleWeather}
              defaultChecked
            />
          </label>
          <label>
            rainy
            <input
              name="weather"
              type="radio"
              value="rainy"
              onChange={handleWeather}
            />
          </label>
          <label>
            stormy
            <input
              name="weather"
              type="radio"
              value="stormy"
              onChange={handleWeather}
            />
          </label>
          <label>
            windy
            <input
              name="weather"
              type="radio"
              value="windy"
              onChange={handleWeather}
            />
          </label>
        </label>
      </div>
      <div>
        <label>
          visibility{" "}
          <label>
            great{" "}
            <input
              type="radio"
              name="visibility"
              value="great"
              onChange={handleVisibility}
            />
          </label>
          <label>
            good{" "}
            <input
              type="radio"
              name="visibility"
              value="good"
              onChange={handleVisibility}
            />
          </label>
          <label>
            ok{" "}
            <input
              type="radio"
              name="visibility"
              value="ok"
              onChange={handleVisibility}
            />
          </label>
          <label>
            poor{" "}
            <input
              type="radio"
              name="visibility"
              value="poor"
              onChange={handleVisibility}
            />
          </label>
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
