import React, { useEffect } from "react";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import NormalLayout from "layout/NormalLayout";
import Login from "pages/Login";
import AutoLogin from "components/AutoLogin";
import AuthLayout from "layout/AuthLayout";
import Manager from "pages/Manager";
import { useSelector } from "react-redux";
import { getAccessToken, getRefreshToken } from "services/localStorage";

function App() {
  const loginStatus = useSelector((state) => state.loginStatus);
  useEffect(() => {
    console.log("Access token:" , getAccessToken())
    console.log("Refresh token:" , getRefreshToken())

    console.log(loginStatus);
  }, [loginStatus]);
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AutoLogin />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<NormalLayout />}>
              <Route path="auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Navigate to="login" />} />
              </Route>
              <Route path="" element={<Manager />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
