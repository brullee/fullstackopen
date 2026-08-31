export const isNumber = (argument: unknown): boolean =>
  !isNaN(Number(argument));

export const isArray = (argument: unknown): boolean => {
  if (Array.isArray(argument)) {
    return argument.every((el) => isNumber(el));
  }
  return false;
};

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return NaN;
};
