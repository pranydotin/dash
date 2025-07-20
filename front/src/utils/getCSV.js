export const getCSV = (rows) => {
  const headers = [
    ...rows
      .find((row) => row.rowId === "header")
      .cells.slice(1)
      .map((cell) => cell.text),
  ];

  const dataRows = rows
    .filter((row) => row.rowId !== "header")
    .map((row) => row.cells.slice(1).map((cell) => cell.text));

  const csvString = [headers, ...dataRows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const activeHeader = [...headers];
  console.log(activeHeader);

  return csvString;
};
