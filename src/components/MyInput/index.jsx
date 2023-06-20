import { IconButton, Input, SvgIcon, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as IconEye } from "assets/icon/icon_eye.svg";
import { ReactComponent as IconEyeSlash } from "assets/icon/icon_eye_slash.svg";

const MyInput = ({
  label,
  placeholder,
  startIcon,
  disabled = false,
  error = false,
  type = "",
  onChange,
  sx,
  value,
  error_message = "",
  onBlur,
  ...props
}) => {
  const [invisible, setInvisible] = useState(false);
  useEffect(() => {
    if (type === "password") setInvisible(true);
  }, []);
  const isError = !!error_message.length;
  return (
    <div className="flex flex-col gap-2 w-full">
      {label ? (
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 500,
            color: "#121115",
            fontFamily: "Poppins",
          }}
        >
          {label}
        </Typography>
      ) : (
        <></>
      )}
      <Input
        value={value}
        onBlur={onBlur}
        autoComplete={"none"}
        disabled={disabled}
        onChange={onChange}
        type={invisible ? "password" : type === "date" ? "date" : ""}
        sx={{
          width: "100%",
          border: isError ? "1px solid #E1251B" : "2px solid #DEDDE1",
          borderRadius: "12px",
          padding: "8px 16px",
          ":hover ": {
            boxShadow: !disabled && "0px 0px 5px 5px #C3E8FF",
          },
          "&.Mui-focused ": {
            borderColor: "primary.main",
            boxShadow: " 0px 0px 5px 5px #C3E8FF",
          },
          "&.Mui-disabled": {
            background: "#F3EEEE",
          },
          transition: "all 0.15s",
        }}
        placeholder={placeholder}
        disableUnderline={true}
        endAdornment={
          type === "password" ? (
            <IconButton
              sx={{ padding: 0, marginLeft: "16px" }}
              onClick={() => setInvisible(!invisible)}
            >
              <SvgIcon
                inheritViewBox={true}
                sx={{
                  width: 24,
                  height: 24,
                  fill: "#9D9AA4",
                }}
                color="#9D9AA4"
                component={invisible ? IconEye : IconEyeSlash}
              ></SvgIcon>
            </IconButton>
          ) : (
            <></>
          )
        }
        startAdornment={
          startIcon ? (
            <SvgIcon
              inheritViewBox={true}
              sx={{
                width: 24,
                height: 24,
                fill: "#9D9AA4",
                marginRight: "16px",
              }}
              color="#9D9AA4"
              component={startIcon}
            />
          ) : (
            <></>
          )
        }
        {...props}
      />
      {isError ? (
        <Typography sx={{ fontSize: 12, fontWeight: 400, color: "#E1251B" }}>
          {error_message}
        </Typography>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyInput;
