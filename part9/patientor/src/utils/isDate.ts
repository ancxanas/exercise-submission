const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export default isDate;
