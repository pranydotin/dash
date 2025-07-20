export const AnalyisRequestBox = ({ headers = [] }) => {
  const header =
    headers.length > 0
      ? headers
      : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  return (
    <div className="w-[620px] border-1 border-gray-400 p-4">
      <div className="header flex p-2 border-b-1 border-b-gray-300">
        <h2 className="text-2xl text-gray-500 font-semibold">Title</h2>
      </div>
      <div className="variable-box flex w-full py-4 gap-4">
        <div
          className="flex-1 p-2 bg-white border-1 border-gray-300 h-50 overflow-y-auto"
          id="variables-list"
        >
          <ul>
            {/* <li className="p-1"></li> */}
            {header.map((item, index) => (
              <li key={index} className="px-1 py-0.5 text-[12px]">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex-1 p-2 bg-white border-1 border-gray-300"
          id="selected-variables"
        ></div>
      </div>
    </div>
  );
};
