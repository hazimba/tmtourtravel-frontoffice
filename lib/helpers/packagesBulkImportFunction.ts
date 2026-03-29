import { Package } from "@/types";

export const safeJsonParse = (value: Package) => {
  if (!value) return undefined;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
};

export const excelDateToJSDate = (serial: number) => {
  const excelEpoch = new Date(1899, 11, 30);
  return new Date(excelEpoch.getTime() + serial * 86400000);
};

export const parseItinerary = (text: string) => {
  if (!text || typeof text !== "string") return [];

  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const result: { day: string; description: string[] }[] = [];

  let current: { day: string; description: string[] } | null = null;

  lines.forEach((line) => {
    // If line contains "DAY" → new section
    if (line.includes("DAY") || line.includes("Day")) {
      if (current) {
        result.push(current);
      }

      const [dayPart, ...descPart] = line.split("|");

      current = {
        day: dayPart.trim(),
        description: descPart.join("|").trim()
          ? [descPart.join("|").trim()]
          : [],
      };
    } else {
      // continuation of description
      if (current) {
        current.description.push(line);
      }
    }
  });

  if (current) result.push(current);

  // join description
  return result.map((item) => ({
    day: item.day,
    description: item.description.join("\n"),
  }));
};

export const parseMYDateTime = (value: string) => {
  const [datePart, timePart] = value.trim().split(" ");

  if (!datePart || !timePart) return null;

  const [day, month, year] = datePart.split("/");
  const [hour, minute] = timePart.split(":");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute)
  );
};

export const parseFlightSchedule = (text: string) => {
  if (!text || typeof text !== "string") return [];

  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [fromStr, toStr] = line.split("-");

      if (!fromStr || !toStr) return null;

      const from = parseMYDateTime(fromStr);
      const to = parseMYDateTime(toStr);

      if (!from || !to) return null;

      return {
        range: {
          from,
          to,
        },
      };
    })
    .filter(Boolean);
};

export const parseSalePeriod = (value: string) => {
  if (!value || typeof value !== "string") return undefined;

  const parts = value.split("-").map((v) => v.trim());
  if (parts.length !== 2) return undefined;

  const [fromStr, toStr] = parts;

  const parseDate = (dateStr: string, isEnd = false) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    if (!day || !month || !year) return null;

    const date = new Date(Date.UTC(year, month - 1, day));

    if (isEnd) {
      date.setUTCHours(23, 59, 59, 0);
    } else {
      date.setUTCHours(0, 0, 0, 0);
    }

    return date.toISOString();
  };

  const from = parseDate(fromStr, false);
  const to = parseDate(toStr, true);

  if (!from || !to) return undefined;

  return { from, to };
};

export const formatZodErrors = (errors: any[], rows: any[]) => {
  return errors.map((err) => {
    const rowData = rows[err.row - 1]; // because row starts from 1
    const title = rowData?.title || "Unknown Title";

    const fieldMessages: string[] = [];

    Object.entries(err.error).forEach(([field, value]: any) => {
      if (field === "_errors") return;

      if (value?._errors?.length) {
        fieldMessages.push(
          `${field.replace(/_/g, " ").toUpperCase()}: ${value._errors.join(
            ", "
          )}`
        );
      }
    });

    return {
      row: err.row,
      title,
      messages: fieldMessages,
    };
  });
};

export const normalizeDate = (dateStr?: string): string | null => {
  if (!dateStr || typeof dateStr !== "string") return null;

  const trimmed = dateStr.trim();
  if (!trimmed) return null;

  // If already ISO format
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  // Convert DD/MM/YYYY
  const parts = trimmed.split("/");

  if (parts.length !== 3) return null;

  const [day, month, year] = parts;

  if (!day || !month || !year) return null;

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
