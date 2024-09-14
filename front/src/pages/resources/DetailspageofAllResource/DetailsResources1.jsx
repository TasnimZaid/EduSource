import React from "react";
import FilterComponent from "./Filter";
import Sidebar from "../../../component/Sidebar";
import QuizPlatform from "./AllResourceDetails";

function DetailsResources1() {
  return (
    <div className="flex h-screen bg-[#F2F2F2]">
      {/* Sidebar */}
      <div className="w-20 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        {/* Grid container for Filter and QuizPlatform */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 h-full">
          {/* Filter component */}
          <div className="md:col-span-1 ">
            <FilterComponent />
          </div>

          {/* Quiz platform */}
          <div className="md:col-span-3 overflow-auto">
            <QuizPlatform />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsResources1;