import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Typography, styled } from "@mui/material";

const DateDisplay = styled(DatePicker)(({ theme }) => ({
  ".MuiInputBase-root": {
    borderRadius: "12px",
    ":hover": {
      boxShadow: "0px 0px 5px 5px #C3E8FF",
    },
    ":focus": {
      borderColor: "primary.main",
      boxShadow: " 0px 0px 5px 5px #C3E8FF",
    },
  },
  "& input": { border: 0, borderColor: "#fff" },
}));
const MyInputDate = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography sx={{ fontSize: 14, fontWeight: 400, fontFamily: "Poppins" }}>
        {label}
      </Typography>
      <DateDisplay {...props} />
    </div>
  );
};

export default MyInputDate;
