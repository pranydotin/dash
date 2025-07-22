import { ReactGrid } from "@silevis/reactgrid";
import { useState, useEffect, useRef } from "react";
import { AnalyisRequestBox } from "./AnalysisRequestBox";
import { getCSV } from "../utils/getCSV";
import { getAnalysis } from "../utils/analysisRequest";
import { Results } from "./Results";
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
  const [results, setResults] = useState([]);

  useEffect(() => {
    setColumns(gridData.columns);
    setRows(gridData.rows);
    setHeaders(gridData.headers);
  }, [gridData]);

  useEffect(() => {
    if (rows.length > 0) {
      const [header, csv] = getCSV(rows);
      getAnalysis(csv, "Descriptives");
    }
  }, [activeAnalysis]);

  //   useEffect(() => {
  //     console.log(results);
  //   }, [results]);

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
        <>
          <AnalyisRequestBox
            headers={headers}
            setAnalysis={setActiveAnalysis}
            title={activeAnalysis}
            setcontainerWidth={setcontainerWidth}
            rows={rows}
            results={results}
            setResults={setResults}
          />
          <div className="drag bg-gray-100 w-[10px] cursor-w-resize flex justify-center items-center">
            {/* <i className="fa-solid fa-ellipsis-vertical text-gray-400"></i> */}
          </div>
        </>
      )}
      <Results results={results} setResults={setResults} />
    </div>
  );
};
