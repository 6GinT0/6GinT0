type DateParts = [number, number, number];

export const formatDate = (date: string) => {
  if (!date) return "";

  const [year, month, day]: DateParts = date
    .split("-")
    .map((part) => parseInt(part, 10)) as DateParts;

  const dateObj = new Date(year, month - 1, day);

  if (isNaN(dateObj.getTime())) return date;

  return dateObj.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};
