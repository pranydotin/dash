export const buildGrid = (
  data = [],
  rowCount = 0,
  colCount = 0,
  header = []
) => {
  const DEFAULT_ROW_COUNT = 50;
  const DEFAULT_COLUMN_COUNT = 16;

  //   check if data exists
  const hasData = Array.isArray(data) && data.length > 0;
  const totalRows = Math.max(rowCount, DEFAULT_ROW_COUNT);
  const totalCols = Math.max(colCount, DEFAULT_COLUMN_COUNT);

  const getExcelColumnName = (index) => {
    let name = "";
    while (index >= 0) {
      name = String.fromCharCode((index % 26) + 65) + name;
      index = Math.floor(index / 26) - 1;
    }
    return name;
  };

  const columns = [
    { columnId: "rowNumber", width: 50 },
    ...Array.from({ length: totalCols }, (_, i) => ({
      columnId: getExcelColumnName(i),
      width: 120,
      resizable: true,
    })),
  ];

  const headerRow = {
    rowId: "header",
    cells: [
      { type: "header", text: "" },
      ...Array.from({ length: totalCols }, (_, colIndex) => ({
        type: "header",
        text: header[colIndex] !== undefined ? String(header[colIndex]) : "",
      })),
    ],
  };

  const gridRows = [headerRow];
  for (let i = 0; i < totalRows; i++) {
    const rowData = data[i] || [];

    const rowCells = [
      { type: "header", text: String(i + 1) }, // Row number column
      ...Array.from({ length: totalCols }, (_, colIndex) => ({
        type: "text",
        text: rowData[colIndex] !== undefined ? String(rowData[colIndex]) : "",
      })),
    ];
    gridRows.push({
      rowId: i + 1,
      cells: rowCells,
    });
  }
  return {
    status: "default",
    columns,
    rows: gridRows,
  };
};
//   const rows = [
//     headerRow,
//     ...Array.from({ length: totalRows }, (_, i) => ({
//       rowId: i + 1,
//       cells: [
//         { type: "header", text: String(i + 1) },
//         ...Array.from({ length: totalCols }, () => ({
//           type: "text",
//           text: "",
//         })),
//       ],
//     })),
//   ];

//   return {
//     status: "default",
//     columns,
//     rows,
//   };
// };
