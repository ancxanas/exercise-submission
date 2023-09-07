import DiaryList from "./components/DiaryList";
import { useEffect } from "react";
import { initializeDiaries } from "./reducers/diaryReducer";
import { useAppDispatch } from "./hooks";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeDiaries());
  }, []);

  return (
    <div>
      <DiaryForm />
      <DiaryList />
    </div>
  );
};

export default App;
