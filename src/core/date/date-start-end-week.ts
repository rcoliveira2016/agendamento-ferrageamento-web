export const startEndDateWeek = (data: Date) => {
  const curr = data;

  return {
    start: new Date(curr.setDate(curr.getDate() - curr.getDay())),
    end: new Date(curr.setDate(curr.getDate() - curr.getDay() + 6)),
  };
};
