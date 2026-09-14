interface HeaderProp {
  name: string;
}

interface ContentProps {
  parts: {
    name: string;
    exerciseCount: number;
  }[];
}

interface TotalProp {
  total: number;
}

export const Header = (props: HeaderProp) => {
  return <h1>{props.name}</h1>;
};

export const Content = (props: ContentProps) => {
  return (
    <div>
      <p>
        {props.parts[0].name} {props.parts[0].exerciseCount}
      </p>
      <p>
        {props.parts[1].name} {props.parts[1].exerciseCount}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exerciseCount}
      </p>
    </div>
  );
};

export const Total = (props: TotalProp) => {
  return <p>Number of exercises {props.total}</p>;
};
