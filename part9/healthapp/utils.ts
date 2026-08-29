export const isNumber = (argument: any): boolean => !isNaN(Number(argument));

export const isArray = (argument: any): boolean => {
  if (Array.isArray(argument)) {
    let result = argument.every((el) => {
      if (el.trim() === "") {
        return false;
      }
      return isNumber(el);
    });
    return result;
  }
  return false;
};
