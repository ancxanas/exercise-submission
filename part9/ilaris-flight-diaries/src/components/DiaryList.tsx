import { DiaryEntry } from "../types";
import { useAppSelector } from "../hooks";

const DiaryList = () => {
  const diaries = useAppSelector((state) => state.diary);

  return (
    <div>
      <h2>Diary entries</h2>
      <div>
        {diaries.map((diary: DiaryEntry) => (
          <div key={diary.id}>
            <h4>{diary.date}</h4>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
