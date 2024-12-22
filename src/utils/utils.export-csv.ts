// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportToCsv = (data: any[], filename: string = "export.csv"): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const headerRow = headers.map((header) => `"${header}"`).join(",");

  const csvContent = [
    headerRow,
    ...data.map((row) =>
      Object.values(row)
        .map((value) => (typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value))
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
