import type { CoursePart, CoursePartBase } from "../utils/types";
import { assertNever } from "../utils/utils";

const Basic = ({ name, exerciseCount }: CoursePartBase) => {
  return (
    <>
      <strong>
        {name} {exerciseCount}
      </strong>
      <br />
    </>
  );
};

export const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <Basic name={part.name} exerciseCount={part.exerciseCount} />
          <i>{part.description}</i>
        </p>
      );
    case "background":
      return (
        <p>
          <Basic name={part.name} exerciseCount={part.exerciseCount} />
          <i>{part.description}</i>
          <br />
          submit to {part.backgroundMaterial}
        </p>
      );
    case "group":
      return (
        <p>
          <Basic name={part.name} exerciseCount={part.exerciseCount} />
          project exercises {part.groupProjectCount}
        </p>
      );
    case "special":
      return (
        <p>
          <Basic name={part.name} exerciseCount={part.exerciseCount} />
          <i>{part.description}</i>
          <br />
          required skills: {part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(part);
  }
};
