import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

export const SheetContainer = ({ gridData }) => {
  let rows, columns;
  if (gridData) {
    columns = gridData.columns;
    rows = gridData.rows;
  } else {
    columns = [
      { columnId: "rowNumber", width: 50 },
      { columnId: "A", width: 150 },
      { columnId: "B", width: 150 },
      { columnId: "C", width: 150 },
      { columnId: "D", width: 150 },
      { columnId: "E", width: 150 },
    ];
    rows = [
      {
        rowId: "header",
        cells: [
          { type: "header", text: "" },
          { type: "header", text: "A" },
          { type: "header", text: "B" },
          { type: "header", text: "C" },
          { type: "header", text: "D" },
          { type: "header", text: "E" },
        ],
      },
      ...Array.from({ length: 20 }, (_, i) => ({
        rowId: i + 1,
        cells: [
          { type: "header", text: `${i + 1}` },
          { type: "text", text: "" },
          { type: "text", text: "" },
          { type: "text", text: "" },
          { type: "text", text: "" },
          { type: "text", text: "" },
        ],
      })),
    ];
  }
  return (
    <div className="w-full h-[calc(100vh-4rem)] overflow-x-auto">
      <div className="w-full h-full">
        <ReactGrid
          rows={rows}
          columns={columns}
          enableRangeSelection
          stickyLeftColumns={1}
          stickyTopRows={1}
        />
      </div>
    </div>
  );
};
