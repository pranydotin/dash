export const buildEmptyGrid = (data = []) => {
  console.log(data);
  const rowCount = 50;
  const colCount = 16;
  const columns = [
    { columnId: "rowNumber", width: 50 },
    ...Array.from({ length: colCount }, (_, i) => ({
      columnId: String.fromCharCode(65 + i),
      width: 120,
      resizable: true,
    })),
  ];

  const headerRow = {
    rowId: "header",
    cells: [
      { type: "header", text: "" },
      ...columns.slice(1).map((col) => ({
        type: "header",
        text: col.columnId,
      })),
    ],
  };

  const rows = [
    headerRow,
    ...Array.from({ length: rowCount }, (_, i) => ({
      rowId: i + 1,
      cells: [
        { type: "header", text: String(i + 1) },
        ...Array.from({ length: colCount }, () => ({
          type: "text",
          text: "",
        })),
      ],
    })),
  ];

  return {
    status: "default",
    columns,
    rows,
  };
};
