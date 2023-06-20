import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginImg1 from "assets/img/login_img1.png";
import MyInput from "components/MyInput";
import MyCheckBox from "components/MyCheckBox";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "services/auth";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "reducers/loginStatusReducer";
import useAPI from "hooks/useApi";

const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const loginRequest = useAPI({ queryFn: (data) => login(data) });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleLogin = () => {
    if (formValue.password === "")
      return toast.error("Mật khẩu không thể trống");
    setLoading(true);
    loginRequest
      .run({ account: formValue.email, password: formValue.password })
      .then((res) => {
        dispatch(setLoginStatus({ isChecking: false, isLogin: true }));
        toast.success("Đăng nhập thành công");
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };
  return (
    <div className="flex flex-col gap-5 pt-4 items-center w-full h-full">
      <Typography
        sx={{
          fontSize: 50,
          fontWeight: 700,
          color: "#49654E",
        }}
      >
        KỲ THI TUYỂN SINH 2023
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: "24px",
          height: "100%",
          border: "1px solid #949494",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
          gap: "32px",
          paddingX: "40px",
        }}
      >
        <div className="flex flex-col items-center justify-center min-w-[800px] h-[400px] overflow-hidden">
          <img alt="" src={LoginImg1} className="w-full h-auto object-cover" />
        </div>
        <div className="flex flex-col gap-[24px] w-full">
          <MyInput placeholder="email" name="email" onChange={handleChange} />
          <MyInput
            placeholder="password"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <div className="flex flex-row items-center">
            <MyCheckBox label={"Ghi nhớ đăng nhập"} />
            <Typography
              sx={{
                marginLeft: "auto",
                fontSize: 18,
                fontWeight: 400,
                color: "#575556",
              }}
            >
              Quên mật khẩu?
            </Typography>
          </div>
          <Button
            sx={{
              background: "#15CDCB",
              color: "#fff",
              borderRadius: "12px",
              ":hover": {
                color: "#000",
                border: "1px solid #15CDCB",
              },
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            Đăng nhập
          </Button>
          <div className="flex flex-row items-center gap-2 pb-[16px] border-b-[1px] border-b-[#D3D3D3]">
            <Typography
              sx={{ fontSize: 14, fontWeight: 400, color: "#344837" }}
            >
              Bạn chưa có tài khoản?
            </Typography>
            <Link to="/auth/register">
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#FF0000",
                  ":hover": { fontWeight: 600 },
                }}
              >
                Đăng ký ngay
              </Typography>
            </Link>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Login;
