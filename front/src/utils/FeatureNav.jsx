export const FeatureNav = ({ setIsFeatureNavBoxOpen }) => {
  return (
    <>
      <aside className="nav-list bg-amber-50 p-1 py-10 text-[10px] w-20">
        <div
          className="w-[30px] p-1 bg-amber-700 flex justify-center items-center   group cursor-pointer shadow-md hover:shadow-xl-30 hover:bg-amber-900 relative top-[-37px] left-[40px] rounded-l-[10px]"
          onClick={() => setIsFeatureNavBoxOpen(false)}
        >
          <i className="fa-solid fa-arrow-left text-amber-100 group-hover:text-amber-100 text-[15px]"></i>
        </div>
        <ul className="flex flex-col gap-3 ">
          <li className="flex justify-center flex-col items-center gap-1 cursor-pointer hover:bg-amber-200 px-1 pb-1 text-amber-800 hover:text-amber-800">
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="20" width="8" height="25" fill="steelblue" />
              <rect x="15" y="10" width="8" height="35" fill="tomato" />
              <rect x="25" y="30" width="8" height="15" fill="orange" />
            </svg>
            Exploration
          </li>
          <li>feature 2</li>
        </ul>
      </aside>
    </>
  );
};
