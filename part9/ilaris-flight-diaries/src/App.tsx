import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";
import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaries } from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <div>
      <DiaryForm diaries={diaries} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
