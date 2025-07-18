import { useState, useRef } from "react";

export const DashboardNav = ({
  onFileSelect,
  isHamMenuOpen,
  setIsHamMenuOpen,
  activeNav,
  setActiveNav,
  setIsFeatureNavBoxOpen,
}) => {
  return (
    <header>
      <ul className=" bg-amber-100 rounded-md flex nav-list">
        <li
          className="text-center  px-5 py-2 hover:bg-amber-200 cursor-pointer"
          onClick={() => setIsHamMenuOpen(true)}
        >
          <i className="fa-solid fa-bars text-amber-700  text-lg cursor-pointer hover:text-amber-800"></i>
        </li>
        <li
          className={`text-center px-5 py-2  cursor-pointer text-amber-700 hover:text-amber-800 ${
            activeNav == "Analysis"
              ? "bg-amber-50 hover:bg-amber-50"
              : "hover:bg-amber-200"
          }`}
          onClick={() => {
            setActiveNav("Analysis");
            setIsFeatureNavBoxOpen(true);
          }}
        >
          Analyis
        </li>
        <li
          className={`text-center px-5 py-2  cursor-pointer text-amber-700 hover:text-amber-800 ${
            activeNav == "Test"
              ? "bg-amber-50 hover:bg-amber-50"
              : "hover:bg-amber-200"
          }`}
          onClick={() => {
            setActiveNav("Test");
            setIsFeatureNavBoxOpen(true);
          }}
        >
          Test
        </li>
      </ul>
      <Aside
        isHamMenuOpen={isHamMenuOpen}
        onclose={() => setIsHamMenuOpen(false)}
        onFileSelect={onFileSelect}
      />
    </header>
  );
};

const Aside = ({ isHamMenuOpen, onclose, onFileSelect }) => {
  const importRef = useRef();
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };
  return (
    <aside
      className={`w-64 h-screen bg-white text-amber-900 fixed -left-64 top-0 shadow-lg z-10 transform transition-transform duration-300 ease-in-out ${
        isHamMenuOpen ? "translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="p-6 text-xl font-bold border-b border-amber-300 bg-amber-100 ">
        <div
          className="text-right cursor-pointer hover text-amber-50"
          onClick={onclose}
        >
          <i className="fa-solid fa-xmark text-amber-700"></i>
        </div>
      </div>
      <nav>
        <ul className="w-full">
          <li
            className="block cursor-pointer hover:text-amber-600 hover:bg-amber-50 p-3"
            onClick={() => importRef.current.click()}
          >
            Import File
          </li>
        </ul>
      </nav>
      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleChange}
        ref={importRef}
        style={{ display: "none" }} // Hide the default file input
      />
    </aside>
  );
};
