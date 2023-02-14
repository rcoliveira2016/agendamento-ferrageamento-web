export const startEndDateWeek = (data: Date) => {
  const curr = data; // get current date
  const first = curr.getDate() - curr.getDay();
  const last = first + 6;
  return {
    start: new Date(curr.setDate(first)),
    end: new Date(curr.setDate(last)),
  };
};
