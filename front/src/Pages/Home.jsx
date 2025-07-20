import { useEffect, useState } from "react";

import { DashboardNav } from "../components/DashboardNav";
import { SheetContainer } from "../components/SheetContainer";
import { ToastContainer, toast } from "react-toastify";
import { buildGrid } from "../utils/buildGrid";
import { FeatureNav } from "../utils/FeatureNav";

export const Home = () => {
  const [plot, setPlot] = useState(null);
  const [gridData, setGridData] = useState(() => buildGrid());
  const [isHamMenuOpen, setIsHamMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const [isFeatureNavBoxOpen, setIsFeatureNavBoxOpen] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState(null);
  const [sheetContainerWidth, setcontainerWidth] = useState("750px");

  const handleSubmit = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://127.0.0.1:8000/datasets", {
      method: "post",
      body: formData,
    });
    const res = await response.json();
    if (res.status != "error") {
      setGridData(() => buildGrid(res.data, res.rows, res.cols, res.header));
      setIsHamMenuOpen(false);
    } else toast.error(res.msg);
  };
  return (
    <>
      <DashboardNav
        onFileSelect={handleSubmit}
        isHamMenuOpen={isHamMenuOpen}
        setIsHamMenuOpen={setIsHamMenuOpen}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        setIsFeatureNavBoxOpen={setIsFeatureNavBoxOpen}
      />
      <div className="flex">
        {isFeatureNavBoxOpen && (
          <FeatureNav
            setIsFeatureNavBoxOpen={setIsFeatureNavBoxOpen}
            setActiveNav={setActiveNav}
            setActiveAnalysis={setActiveAnalysis}
            setSheetWidth={setcontainerWidth}
          />
        )}
        <SheetContainer
          gridData={gridData}
          activeAnalysis={activeAnalysis}
          setActiveAnalysis={setActiveAnalysis}
          setcontainerWidth={setcontainerWidth}
          sheetContainerWidth={sheetContainerWidth}
        />
      </div>
      <ToastContainer />
    </>
  );
};
