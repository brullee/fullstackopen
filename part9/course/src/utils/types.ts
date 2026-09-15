export interface HeaderProp {
  name: string;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDesc {
  kind: "basic";
}

interface CoursePartBackground extends CoursePartDesc {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDesc {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

export interface ContentProps {
  parts: CoursePart[];
}

export interface TotalProp {
  total: number;
}
