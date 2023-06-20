import React from "react";

import AppBar from "components/appBar";
import { Outlet } from "react-router-dom";

const NormalLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <AppBar />
      <Outlet />
    </div>
  );
};

export default NormalLayout;
