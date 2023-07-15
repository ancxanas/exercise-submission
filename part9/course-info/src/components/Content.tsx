const Content = ({
  name,
  exerciseCount,
}: {
  name: string;
  exerciseCount: number;
}) => (
  <h4 key={name}>
    {name} {exerciseCount}
  </h4>
);

export default Content;
