import type { ContentProps } from "../utils/types";
import { assertNever } from "../utils/utils";

export const Content = ({ parts }: ContentProps) => {
  parts.forEach((part) => {
    switch (part.kind) {
      case "basic":
        console.log(part.name, part.exerciseCount, part.description);
        break;
      case "group":
        console.log(part.name, part.exerciseCount, part.groupProjectCount);
        break;
      case "background":
        console.log(part.name, part.exerciseCount, part.backgroundMaterial);
        break;
      default:
        return assertNever(part);
    }
  });
};
