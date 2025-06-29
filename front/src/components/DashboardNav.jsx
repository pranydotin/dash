import { useState, useRef } from "react";

export const DashboardNav = ({ onFileSelect }) => {
  const fileRef = useRef();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };
  return (
    <header>
      <div className="p-5 bg-amber-100 rounded-md ">
        <span
          className="p-3 text-amber-100 bg-amber-700 transition-colors delay-75 duration-100 ease-in-out hover:bg-amber-100 hover:text-amber-700 border border-amber-700 rounded-md cursor-pointer"
          onClick={() => fileRef.current.click()}
        >
          Import File
        </span>

        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleChange}
          ref={fileRef}
          style={{ display: "none" }} // Hide the default file input
        />
      </div>
    </header>
  );
};
