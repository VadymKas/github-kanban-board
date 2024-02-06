const calcDays = (date: string): number => {
  const day = 1000 * 60 * 60 * 24;

  const daysDif = Date.now() - new Date(date).getTime();

  return Math.floor(daysDif / day);
};

export default calcDays;