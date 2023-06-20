import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const loginStatus = useSelector((state) => state.loginStatus);
  if (loginStatus.isChecking) return <CircularProgress />;
  if (loginStatus.isLogin) return <Navigate to="/info" />;
  return <Outlet />;
};

export default AuthLayout;
