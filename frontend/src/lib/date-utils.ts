
import { format, parseISO } from "date-fns";

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  
  try {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy");
  } catch (e) {
    return "Invalid date";
  }
}

export function formatYearMonth(yearMonthString: string | undefined): string {
  if (!yearMonthString) return "N/A";
  
  try {
    const date = parseISO(`${yearMonthString}-01`);
    return format(date, "MMMM yyyy");
  } catch (e) {
    return "Invalid date";
  }
}

export function getCurrentDateString(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export function getFutureDate(daysInFuture: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysInFuture);
  return format(date, "yyyy-MM-dd");
}
