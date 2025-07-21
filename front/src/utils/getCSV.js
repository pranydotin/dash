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
  getAnalysis(csvString, "Descriptives", activeHeader);

  return csvString;
};

const getAnalysis = async (csvString, analyisRequest, activeHeader) => {
  const formData = new FormData();
  const file = new Blob([csvString], { type: "text:csv" });
  formData.append("file", file);
  formData.append("analysisrequest", analyisRequest);
  formData.append("activeHeader", JSON.stringify(activeHeader));
  const response = await fetch("http://127.0.0.1:8000/analysis", {
    method: "post",
    body: formData,
  });
  const res = await response.json();
  console.log(res);
};
