export const isNumber = (argument: any): boolean => !isNaN(Number(argument));

export const isArray = (argument: any): boolean => {
  if (Array.isArray(argument)) {
    return argument.every((el) => isNumber(el));
  }
  return false;
};
