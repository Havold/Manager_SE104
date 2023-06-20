import React from "react";
import AddExamInfo from "./AddExamInfo";
import AddPointInfo from "./AddPointInfo";

const Manager = () => {
  return (
    <div className="flex flex-col p-10 gap-7">
      <AddExamInfo />
      <AddPointInfo />
    </div>
  );
};

export default Manager;
