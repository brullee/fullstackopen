import type { HeaderProp } from "../utils/types";

export const Header = (props: HeaderProp) => {
  return <h1>{props.name}</h1>;
};
