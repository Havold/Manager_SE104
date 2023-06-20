import React from "react";
import { ReactComponent as Logo } from "assets/img/logo.svg";
import { Button, CircularProgress, SvgIcon, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAPI from "hooks/useApi";
import { logout } from "services/auth";
import { toast } from "react-toastify";
import { setLoginStatus } from "reducers/loginStatusReducer";

const AppBar = () => {
  return (
    <div className="flex flex-row bg-[#000] px-[40px] py-2">
      <SvgIcon
        component={Logo}
        inheritViewBox={true}
        sx={{ width: 300, height: "auto" }}
      />
      <div className="flex flex-row items-center ml-auto gap-6 mt-auto pb-3">
        <UserAuth />
      </div>
    </div>
  );
};
const UserAuth = () => {
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.loginStatus);
  const logoutRequest = useAPI({ queryFn: logout });
  const dispatch = useDispatch();
  const handleLogout = () => {
    logoutRequest.run().then((res) => {
      toast.success("Logout success");
      dispatch(setLoginStatus({ isLogin: false, isChecking: false }));
      navigate("auth/login");
    });
  };
  if (loginStatus.isChecking) return <CircularProgress />;
  if (loginStatus.isLogin)
    return (
      <Button
        onClick={handleLogout}
        sx={{ background: "#fff", ":hover": { background: "#fff" } }}
      >
        Đăng xuất
      </Button>
    );
  return (
    <Link to="/auth/login">
      <Typography sx={{ fontSize: 24, color: "#fff" }}>Đăng nhập</Typography>
    </Link>
  );
};
export default AppBar;
