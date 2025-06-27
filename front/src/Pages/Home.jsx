import { useState } from "react";

import { DashboardNav } from "../components/DashboardNav";
import { SheetContainer } from "../components/SheetContainer";

export const Home = () => {
  const [plot, setPlot] = useState(null);
  const [gridData, setGridData] = useState(null);

  const handleSubmit = async (file) => {
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://127.0.0.1:8000/datasets", {
      method: "post",
      body: formData,
    });
    const res = await response.json();
    // const url = URL.createObjectURL(res);
    // setPlot(url);
    console.log(res);
    setColumns(res.columns);
    setRows(res.rows);
    setGridData(res);
  };
  return (
    <>
      <DashboardNav onFileSelect={handleSubmit} />
      <SheetContainer gridData={gridData} />
    </>
  );
};
