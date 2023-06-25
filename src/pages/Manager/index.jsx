import React from "react";
import AddExamInfo from "./AddExamInfo";
import AddPointInfo from "./AddPointInfo";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";

const Manager = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  if (loginStatus.isChecking) return <CircularProgress />;
  if (!loginStatus.isLogin) return <Navigate to="/auth/login" />;
  return (
    <div className="flex flex-col p-10 gap-7">
      <AddExamInfo />
      <AddPointInfo />
    </div>
  );
};

export default Manager;
