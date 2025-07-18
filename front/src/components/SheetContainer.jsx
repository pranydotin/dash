import { ReactGrid } from "@silevis/reactgrid";
import { useState, useEffect, useRef } from "react";
import "@silevis/reactgrid/styles.css";

export const SheetContainer = ({ gridData }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    setColumns(gridData.columns);
    setRows(gridData.rows);
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

  const [width, setWidth] = useState("750px");
  const isResizing = useRef(false);

  const startResize = (e) => {
    isResizing.current = true;

    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResize);
  };
  const handleResize = (e) => {
    if (!isResizing.current) return;

    const container = document.querySelector("#main-container");
    const containerRect = container.getBoundingClientRect();
    let newWidth = e.clientX - containerRect.left;

    newWidth = Math.max(Math.min(containerRect.width - 30, newWidth));
    setWidth(`${newWidth}px`);
  };
  const stopResize = () => {
    isResizing.current = false;
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", stopResize);
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
