import { ReactGrid } from "@silevis/reactgrid";
import { useState, useEffect, useRef } from "react";
import { AnalyisRequestBox } from "./AnalysisRequestBox";
import { getCSV } from "../utils/getCSV";
import "@silevis/reactgrid/styles.css";

export const SheetContainer = ({
  gridData,
  activeAnalysis,
  setActiveAnalysis,
  setcontainerWidth,
  sheetContainerWidth,
}) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    setColumns(gridData.columns);
    setRows(gridData.rows);
    setHeaders(gridData.headers);
  }, [gridData]);

  useEffect(() => {
    console.log(activeAnalysis);
    if (rows.length > 0) {
      const csv = getCSV(rows);
    }
  }, [activeAnalysis]);

  const handleColumnResize = (ci, width) => {
    setColumns((prevColumns) => {
      const columnIndex = prevColumns.findIndex((el) => el.columnId === ci);
      const resizedColumn = prevColumns[columnIndex];
      const updatedColumn = { ...resizedColumn, width };
      prevColumns[columnIndex] = updatedColumn;
      return [...prevColumns];
    });
  };

  //   const [width, setWidth] = useState("750px");
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
    setcontainerWidth(`${newWidth}px`);
  };
  const stopResize = () => {
    isResizing.current = false;
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", stopResize);
  };

  return (
    <div
      className="w-full h-[calc(100vh-3rem)] overflow-x-auto flex p-2 bg-gray-100"
      id="main-container"
    >
      <div
        style={{ width: `${sheetContainerWidth}` }}
        className="overflow-x-auto bg-white border-gray-300 border-1"
      >
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
        className="drag bg-gray-100 w-[15px] cursor-w-resize flex justify-center items-center"
        onMouseDown={startResize}
      >
        <i className="fa-solid fa-ellipsis-vertical text-gray-400"></i>
      </div>
      {activeAnalysis && (
        <AnalyisRequestBox
          headers={headers}
          setAnalysis={setActiveAnalysis}
          title={activeAnalysis}
          setcontainerWidth={setcontainerWidth}
        />
      )}
      <div className="flex-1"></div>
    </div>
  );
};
