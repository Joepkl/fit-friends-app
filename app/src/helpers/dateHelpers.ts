export function getWeekNumber(date: Date) {
  date = new Date(date);
  date.setHours(0, 0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  // Get first day of year
  const yearStart = new Date(date.getFullYear(), 0, 1);
  // Calculate full weeks to nearest Thursday
  const weekNumber = Math.ceil(((Number(date) - Number(yearStart)) / 86400000 + 1) / 7);
  return weekNumber;
}

export function getWeekStartAndEndDate(weekNumber: number, year: number) {
  // Create a date object set to January 1st of the given year
  const date = new Date(year, 0, 1);

  // Calculate the day of the year that corresponds to the first day of the week
  const daysOffset = (weekNumber - 1) * 7;
  date.setDate(date.getDate() + daysOffset);

  // Adjust to the Monday of the current week
  const dayOfWeek = date.getDay();
  const dayDifference = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Adjust when Sunday (day 0)
  date.setDate(date.getDate() + dayDifference);

  // Create start and end date objects
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(startDate.getDate() + 6);

  // Format dates as needed
  const formatDate = (date: Date) =>
    `${date
      .getDate()
      .toString()
      .padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;

  return {
    start: formatDate(startDate),
    end: formatDate(endDate),
  };
}
