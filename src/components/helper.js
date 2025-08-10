export function dateFormat(dateStr) {
  // Parse the input date string
  if (!dateStr) return null; // Handle null or undefined input
  if (typeof dateStr !== "string") return dateStr; // Return as is if not a string

  // Create a Date object from the input string
  const date = new Date(dateStr);

  // Convert to IST using toLocaleString
  const options = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-IN", options);
}

export function formatCurrentDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localISOTime = new Date(now.getTime() - offset * 60000)
    .toISOString()
    .slice(0, 16);
  return localISOTime;
}
