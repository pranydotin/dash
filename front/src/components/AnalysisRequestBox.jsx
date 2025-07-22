import { useState, useRef, useEffect } from "react";
import { getCSV } from "../utils/getCSV";
import { getAnalysis } from "../utils/analysisRequest";

export const AnalyisRequestBox = ({
  headers = [],
  setAnalysis,
  title,
  setcontainerWidth,
  rows,
  results,
  setResults,
}) => {
  const header = headers.length > 0 ? headers : ["A", "B", "C"];
  const [variable_selected, setVariableSelected] = useState([]);
  const [group_by, setGroup_by] = useState([]);
  const [activeHeader, setActiveHeader] = useState([...header]);
  const [activeVariable, setActiveVariable] = useState([]);
  const [variableMove, setVariableMove] = useState("right");
  const [groupbyMove, setgroupbyMove] = useState("right");
  const [variableMoveActive, setVariableMoveActive] = useState(true);
  const [groupbyMoveActive, setgroupbyMoveActive] = useState(true);
  const variableArrow = useRef(null);
  const groupByArrow = useRef(null);

  const closeDialog = () => {
    setAnalysis(null);
    setcontainerWidth("750px");
  };

  const handlevariables = (e) => {
    const target = e.target;
    const target_type = target.dataset.variable_type;

    switch (target_type) {
      case "header":
        setActiveVariable([target.innerText.trim()]);
        variableArrow.current.dataset.move = "right";
        setVariableMove("right");
        setgroupbyMove("right");
        setVariableMoveActive(true);
        setgroupbyMoveActive(true);
        break;

      case "variable":
        variableArrow.current.dataset.move = "left";
        setVariableMove("left");
        setActiveVariable([target.innerText.trim()]);
        setgroupbyMoveActive(false);
        break;

      case "groupby":
        groupByArrow.current.dataset.move = "left";
        setgroupbyMove("left");
        setActiveVariable([target.innerText.trim()]);
        setVariableMoveActive(false);

      case "move": {
        const type = target.dataset.for;
        const direction = target.dataset.move;
        const value = activeVariable;

        if (value.length == 0) break;

        if (type === "variable") {
          const isRight = direction === "right";

          if (variableMoveActive) {
            if (isRight) {
              setActiveHeader((prev) =>
                prev.filter((item) => item !== value[0])
              );

              setVariableSelected((prev) =>
                prev.includes(value) ? prev : [...prev, value[0]]
              );
            } else {
              setVariableSelected((prev) =>
                prev.filter((item) => item !== value[0])
              );

              setActiveHeader((prev) =>
                prev.includes(value) ? prev : [...prev, value[0]]
              );
            }
          }

          setActiveVariable([]);
        }

        if (type === "groupby") {
          const isRight = direction === "right";
          if (groupbyMoveActive) {
            if (isRight) {
              setActiveHeader((prev) =>
                prev.filter((item) => item !== value[0])
              );

              setGroup_by((prev) =>
                prev.includes(value) ? prev : [...prev, value[0]]
              );
            } else {
              setGroup_by((prev) => prev.filter((item) => item !== value[0]));

              setActiveHeader((prev) =>
                prev.includes(value) ? prev : [...prev, value[0]]
              );
            }
          }

          setActiveVariable([]);
        }

        break;
      }
    }
  };
  useEffect(() => {
    const fetchAnalysis = async () => {
      const csv = getCSV(rows);
      const data = await getAnalysis(
        csv,
        "Descriptives",
        variable_selected,
        group_by
      );
      if (data.status == "success") {
        setResults(JSON.parse(data.json_data));
      }
    };
    fetchAnalysis();
  }, [variable_selected, group_by]);

  return (
    <div className="w-[620px] border-1 border-gray-400 p-4">
      <div className="header flex p-2 border-b-1 border-b-gray-300 justify-between items-center ">
        <h2 className="text-2xl text-gray-500 font-semibold">{title}</h2>
        <i
          className="fa-solid fa-xmark text-gray-500 text-2xl cursor-pointer"
          onClick={closeDialog}
        ></i>
      </div>

      <div className="variable-box flex w-full py-4 gap-4 items-stretch">
        {/* variable container */}
        <div
          className="flex-1  bg-white border-1 border-gray-300 h-55 overflow-y-auto"
          id="variables-list"
        >
          <ul>
            {/* <li className="p-1"></li> */}
            {header.map((item, index) => {
              if (activeHeader.includes(item))
                return (
                  <li
                    key={index}
                    id={index}
                    className={` text-[12px] p-1 ${
                      activeVariable.includes(item) ? "bg-amber-100" : ""
                    } cursor-default`}
                    data-variable_type="header"
                    onClick={handlevariables}
                  >
                    {item}
                  </li>
                );
            })}
          </ul>
        </div>
        {/*  */}

        {/* Move Box */}
        <div className="flex1 flex flex-col items-center justify-around gap-7">
          <i
            className={`fa-solid fa-arrow-${
              variableMove === "right" ? "right" : "left"
            } ${variableMoveActive ? "" : "text-gray-300"}`}
            ref={variableArrow}
            data-for="variable"
            data-move={variableMove}
            data-variable_type="move"
            onClick={handlevariables}
          ></i>
          <i
            className={`fa-solid fa-arrow-${
              groupbyMove === "right" ? "right" : "left"
            } ${groupbyMoveActive ? "" : "text-gray-300 cursor-not-allowed"}`}
            ref={groupByArrow}
            data-for="groupby"
            data-move={groupbyMove}
            data-variable_type="move"
            onClick={handlevariables}
          ></i>
        </div>
        {/*  */}

        {/* Requested Box */}
        <div className="flex-1 flex flex-col">
          <h4 className="text-[13px]">Variable</h4>
          <div
            className=" bg-white border-1 border-gray-300 h-30 overflow-y-auto"
            id="selected-variables"
          >
            <ul>
              {variable_selected.map((item, index) => (
                <li
                  key={index}
                  className={` text-[12px] p-1 ${
                    activeVariable.includes(item) ? "bg-amber-100" : ""
                  } cursor-default`}
                  data-variable_type="variable"
                  onClick={handlevariables}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <h4 className="text-[13px]">Group by</h4>
          <div
            className=" bg-white border-1 border-gray-300 h-15 overflow-y-auto"
            id="groupby-variables"
          >
            <ul>
              {group_by.map((item, index) => (
                <li
                  key={index}
                  className={`text-[12px] p-1 ${
                    activeVariable.includes(item) ? "bg-amber-100" : ""
                  } cursor-default`}
                  data-variable_type="groupby"
                  onClick={handlevariables}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};
