import type { TotalProp } from "../utils/types";

export const Total = (props: TotalProp) => {
  return <p>Number of exercises {props.total}</p>;
};
