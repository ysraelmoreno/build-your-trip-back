function getDifferenceInDays(date1: Date, date2: Date) {
  const days = 1000 * 60 * 60 * 24;

  const difference = Number((date1.getTime() - date2.getTime()) / days);

  return difference;
}

export default getDifferenceInDays;
