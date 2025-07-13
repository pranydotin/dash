import { useState } from "react";

import { DashboardNav } from "../components/DashboardNav";
import { SheetContainer } from "../components/SheetContainer";
import { ToastContainer, toast } from "react-toastify";

export const Home = () => {
  const [plot, setPlot] = useState(null);
  const [gridData, setGridData] = useState(null);
  const [isopen, setIsOpen] = useState(false);

  const handleSubmit = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://127.0.0.1:8000/datasets", {
      method: "post",
      body: formData,
    });
    const res = await response.json();
    console.log(res);
    if (res.status != "error") {
      setGridData(res);
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
