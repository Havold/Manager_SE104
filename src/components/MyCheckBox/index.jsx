import { Box, SvgIcon, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as IconChecked } from "assets/icon/icon_checked.svg";

const MyCheckBox = ({ label, disabled = false, onChange = () => {}, value = false }) => {
  const [checked, setChecked] = useState(value);
  const handleClick = () => {
    if (disabled) return;
    setChecked(!checked);
    onChange(!checked);
  };
  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <div className="flex flex-row gap-[10px] items-center">
      <div onClick={handleClick}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "col",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            borderRadius: "5px",
            cursor: "pointer",
            background: disabled ? "#DEDDE1" : checked ? "#2E4958" : "#fff",
            border: disabled
              ? "2px solid #DEDDE1"
              : checked
              ? "2px solid #2E4958"
              : "2px solid #CECCD2",
            ":hover": {
              border: disabled
                ? "2px solid #DEDDE1"
                : checked
                ? "2px solid #2E4958"
                : "2px solid #78D1FF",
            },
          }}
        >
          {checked ? (
            <SvgIcon
              inheritViewBox={true}
              sx={{ width: 10, height: 10, fill: "#fff" }}
              component={IconChecked}
            />
          ) : (
            <></>
          )}
        </Box>
      </div>
      <Typography
        sx={{
          color: disabled ? "#9D9AA4" : "#1C1A1F",
          fontSize: 14,
          fontWeight: 400,
          paddingTop: "2px",
        }}
      >
        {label}
      </Typography>
    </div>
  );
};

export default MyCheckBox;
