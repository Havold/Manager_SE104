import {
  Select,
  Typography,
  MenuItem,
  FormControl,
  SvgIcon,
} from "@mui/material";
import React from "react";
import { ReactComponent as IconArrowDown } from "assets/icon/icon_arrow_down.svg";

import { useToggle } from "@uidotdev/usehooks";

const MySelect = ({
  label,
  labelIcon,
  value = "",
  onChange,
  optionList = [],
  placeholder,
  ...props
}) => {
  const [open, toggle] = useToggle();
  return (
    <FormControl className="flex flex-col w-full gap-2">
      <div className="flex flex-row gap-2">
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: "#121115",
            fontFamily: "Poppins",
          }}
        >
          {label}
        </Typography>
        <img alt="" className="max-w-[14px] maw-h-[14px]" src={labelIcon} />
      </div>
      <div className="flex flex-col ">
        <Select
          onOpen={toggle}
          onClose={toggle}
          IconComponent={(props) => (
            <SvgIcon
              {...props}
              inheritViewBox={true}
              component={IconArrowDown}
            />
          )}
          defaultValue={value}
          {...props}
          value={value}
          displayEmpty
          renderValue={
            value !== ""
              ? undefined
              : () => (
                  <Typography
                    sx={{ color: "#9D9AA4", fontSize: 14, fontWeight: 400 }}
                  >
                    {placeholder}
                  </Typography>
                )
          }
          sx={{
            padding: "0px",
            "&.MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#DEDDE1",
                borderRadius: "12px",
                padding: "12px 15px",
                transition: "all 0.2s ease",
              },
              "&:hover fieldset": {
                borderColor: "#DEDDE1",
                boxShadow: "0px 0px 5px 5px #C3E8FF",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                boxShadow: "0px 0px 5px 5px #C3E8FF",
              },
            },
          }}
          onChange={onChange}
          inputProps={{
            "aria-label": "Without label",
          }}
        >
          {optionList.map((data, index) => (
            <MenuItem
              key={label + "select " + index}
              sx={{
                "&.MuiButtonBase-root:": {
                  background: "#FBEBF3",
                },
              }}
              value={data}
            >
              
                {data}
            </MenuItem>
          ))}
        </Select>
      </div>
    </FormControl>
  );
};

export default MySelect;
