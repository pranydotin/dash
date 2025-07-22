import { useEffect } from "react";
export const Results = ({ results, setResults }) => {
  useEffect(() => {}, [results]);
  if (results.length === 0) {
    return <p></p>;
  }

  const tableHeaders = Object.keys(results[0]);
  return (
    <div className="flex-1 border-1 border-gray-400 p-4">
      <h2 className="font-semibold text-gray-500 text-2xl">Results</h2>

      <div className="table text-[12px] w-full p-2 ">
        <table className="w-full border-b-2">
          <thead className="font-normal border-y-1 border-y-gray-500">
            <tr className="font-normal">
              {tableHeaders.map((header) => (
                <th key={header} className="font-normal p-0.5 text-center">
                  {header !== "Variable" ? header : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, i) => (
              <tr key={i}>
                {tableHeaders.map((header) => (
                  <td key={header} className="p-1 text-center">
                    {row[header] === "" ? "" : row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          margin: "auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <thead style={{ backgroundColor: "#f3f3f3" }}>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((row, i) => (
            <tr key={i}>
              {tableHeaders.map((header) => (
                <td
                  key={header}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {row[header] === "" ? "-" : row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};
