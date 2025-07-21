import { useState, useRef, useEffect } from "react";

export const AnalyisRequestBox = ({
  headers = [],
  setAnalysis,
  title,
  setcontainerWidth,
}) => {
  const header = headers.length > 0 ? headers : ["A", "B", "C"];
  const [variable_selected, setVariableSelected] = useState([]);
  const [group_by, setGroup_by] = useState([]);
  const [activeHeader, setActiveHeader] = useState([...header]);
  const [activeVariable, setActiveVariable] = useState([]);
  const [variableMove, setVariableMove] = useState("right");
  const [groupbyMove, setgroupbyMove] = useState("right");
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
        break;

      case "variable":
        variableArrow.current.dataset.move = "left";
        setVariableMove("left");
        setActiveVariable([target.innerText.trim()]);
        break;

      //   case "move":
      //     const type = target.dataset.for;
      //     switch (type) {
      //       case "variable":
      //         if (target.dataset.move == "right") {
      //           // variable_selected.push(activeVariable);
      //           const updated = [...activeHeader];
      //           const indexToRemove = updated.indexOf(activeVariable[0]);
      //           if (indexToRemove !== -1) updated.splice(indexToRemove, 1);
      //           setActiveHeader(updated);
      //           if (
      //             activeVariable.length > 0 &&
      //             !variable_selected.includes(activeVariable[0])
      //           )
      //             setVariableSelected((prev) => [...prev, activeVariable[0]]);
      //           setActiveVariable([]);
      //         } else {
      //           const updated = [...variable_selected];
      //           const indexToRemove = updated.indexOf(activeVariable[0]);
      //           if (indexToRemove !== -1) updated.splice(indexToRemove, 1);
      //           setVariableSelected(updated);
      //           if (
      //             activeVariable.length > 0 &&
      //             !activeHeader.includes(activeVariable[0])
      //           )
      //             setActiveHeader((prev) => [...prev, activeVariable[0]]);
      //         }
      //         setActiveVariable([]);
      //         break;
      //       case "groupby":
      //         console.log("ba");
      //         break;
      //     }
      //     break;

      case "move": {
        const type = target.dataset.for;
        const direction = target.dataset.move;
        const value = activeVariable;

        if (value.length == 0) break;

        if (type === "variable") {
          const isRight = direction === "right";

          if (isRight) {
            setActiveHeader((prev) => prev.filter((item) => item !== value[0]));

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

          setActiveVariable([]);
        }

        if (type === "groupby") {
          console.log("groupby logic here");
        }

        break;
      }
    }
  };
  useEffect(() => {
    console.log("Updated variable selected:", variable_selected);
  }, [variable_selected]);

  //   useEffect(() => {
  //     console.log(activeVariable);
  //     console.log(variable_selected);
  //     console.log(activeHeader);
  //   }, [activeVariable]);

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
              variableMove == "right" ? "right" : "left"
            }`}
            ref={variableArrow}
            data-for="variable"
            data-move={variableMove}
            data-variable_type="move"
            onClick={handlevariables}
          ></i>
          <i
            className="fa-solid fa-arrow-right"
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
            className=" bg-white border-1 border-gray-300 h-30"
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
            className=" bg-white border-1 border-gray-300 flex-1"
            id="groupby-variables"
          ></div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};
