import { useEffect, useState } from 'react';
import diaryService from './services';
import { Diary } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <div>
      <h3>Diary entries</h3>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h4>{diary.date}</h4>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
