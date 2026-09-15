import type { ContentProps } from "../utils/types";
import { Part } from "./Part";

export const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((part, index) => {
        return <Part key={index} part={part} />;
      })}
    </>
  );
};
