import { useState } from "react";

import { DashboardNav } from "../components/DashboardNav";
import { SheetContainer } from "../components/SheetContainer";
import { ToastContainer, toast } from "react-toastify";
import { buildEmptyGrid } from "../utils/buildEmptyGrid";

export const Home = () => {
  const [plot, setPlot] = useState(null);
  const [gridData, setGridData] = useState(() => buildEmptyGrid());
  const [isopen, setIsOpen] = useState(false);

  const handleSubmit = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://127.0.0.1:8000/datasets", {
      method: "post",
      body: formData,
    });
    const res = await response.json();
    if (res.status != "error") {
      //   console.log(res);
      setGridData(() => buildEmptyGrid(res));
      setIsOpen(false);
    } else toast.error(res.msg);
  };
  return (
    <>
      <DashboardNav
        onFileSelect={handleSubmit}
        isOpen={isopen}
        setIsOpen={setIsOpen}
      />
      <SheetContainer gridData={gridData} />
      <ToastContainer />
    </>
  );
};
