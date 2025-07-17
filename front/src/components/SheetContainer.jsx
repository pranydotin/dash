import { ReactGrid } from "@silevis/reactgrid";
import { useState, useEffect, useRef } from "react";
import "@silevis/reactgrid/styles.css";

export const SheetContainer = ({ gridData }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    if (gridData) {
      setColumns(gridData.columns);
      setRows(gridData.rows);
    } else {
      setColumns([
        { columnId: "rowNumber", width: 50 },
        { columnId: "A", width: 150 },
        { columnId: "B", width: 150 },
        { columnId: "C", width: 150 },
        { columnId: "D", width: 150 },
        { columnId: "E", width: 150 },
      ]);
      setRows([
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
      ]);
    }
  }, [gridData]);

  const handleColumnResize = (ci, width) => {
    setColumns((prevColumns) => {
      const columnIndex = prevColumns.findIndex((el) => el.columnId === ci);
      const resizedColumn = prevColumns[columnIndex];
      const updatedColumn = { ...resizedColumn, width };
      prevColumns[columnIndex] = updatedColumn;
      return [...prevColumns];
    });
  };

  const [width, setWidth] = useState("");
  const isResizing = useRef(false);

  const startResize = (e) => {
    isResizing.current = true;
    console.log(e);

    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResize);
  };
  const handleResize = (e) => {
    if (!isResizing.current) return;
    console.log("start");

    const container = document.querySelector("#main-container");
    const containerRect = container.getBoundingClientRect();
    let newWidth = e.clientX - containerRect.left;

    newWidth = Math.max(50, Math.min(containerRect.width - 50, newWidth));
    console.log(`w-[${newWidth}px]`);
    setWidth(`${newWidth}px`);
  };
  const stopResize = () => {
    isResizing.current = false;
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", stopResize);
    console.log("stop");
  };

  return (
    <div
      className="w-full h-[calc(100vh-3rem)] overflow-x-auto flex"
      id="main-container"
    >
      <div style={{ width: `${width}` }} className="overflow-x-auto">
        <ReactGrid
          rows={rows}
          columns={columns}
          enableRangeSelection
          stickyLeftColumns={1}
          stickyTopRows={1}
          {...(gridData ? { onColumnResized: handleColumnResize } : {})}
        />
      </div>
      <div
        className="drag bg-amber-100 w-[15px] cursor-w-resize flex justify-center items-center"
        onMouseDown={startResize}
      >
        <i className="fa-solid fa-ellipsis-vertical text-amber-300"></i>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};
