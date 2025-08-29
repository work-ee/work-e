// interface Duration {
//   years: number;
//   months: number;
// }

const getYearForm = (count: number): string => {
  if (count === 1) return "рік";
  if (count > 1 && count < 5) return "роки";
  return "років";
};

const getMonthForm = (count: number): string => {
  if (count === 1) return "місяць";
  if (count > 1 && count < 5) return "місяці";
  return "місяців";
};

export const calculateDuration = (start: string, end: string): string | null => {
  if (!start || !end) {
    return null;
  }

  const startDateObj = new Date(start);
  const endDateObj = new Date(end);

  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    return null;
  }

  let years = endDateObj.getFullYear() - startDateObj.getFullYear();
  let months = endDateObj.getMonth() - startDateObj.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const yearsText = years > 0 ? `${years} ${getYearForm(years)}` : "";
  const monthsText = months > 0 ? `${months} ${getMonthForm(months)}` : "";

  return `${yearsText} ${monthsText}`.trim();
};
