import { CoursePart } from '../App';
import Content from './Content';

const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <>
      {courseParts.map((part) => {
        switch (part.kind) {
          case 'basic':
            return (
              <div key={part.name}>
                <Content name={part.name} exerciseCount={part.exerciseCount} />
                <i>{part.description}</i>
              </div>
            );
          case 'background':
            return (
              <div key={part.name}>
                <Content name={part.name} exerciseCount={part.exerciseCount} />
                <i>{part.description}</i>
                <p>submit to {part.backgroundMaterial}</p>
              </div>
            );
          case 'group':
            return (
              <div key={part.name}>
                <Content name={part.name} exerciseCount={part.exerciseCount} />
                <p>{part.groupProjectCount}</p>
              </div>
            );
          case 'special':
            return (
              <div key={part.name}>
                <Content name={part.name} exerciseCount={part.exerciseCount} />
                <i>{part.description}</i>
                <p>required skills: {part.requirements.join(', ')}</p>
              </div>
            );
          default:
            return assertNever(part);
        }
      })}
    </>
  );
};

export default Part;
