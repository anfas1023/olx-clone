import React from "react";
import ProductComponenet from "./ProductComponenet";


const MainContent = () => {

  return (
    <>
      <div className="w-full h-100% ">
        <p className="ml-[130px] mt-7  font-medium text-2xl ">Fresh Recomantation</p>
        <div className="w-[70%] ml-auto mt-10 mr-auto h-[90%]  flex justify-between items-center">
          <div className="grid grid-cols-3 gap-4 items-center h-[100%] w-[100%] ">
             <ProductComponenet/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
