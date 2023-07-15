import { CoursePart } from './App';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <>
    {courseParts.map((course) => (
      <p key={course.name}>
        {course.name} {course.exerciseCount}
      </p>
    ))}
  </>
);

export default Content;
