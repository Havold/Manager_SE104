import { Typography } from "@mui/material";
import React from "react";

const MajorInfo = ({ register_contest_form }) => {
  return (
    <div className="flex flex-col gap-4">
      {register_contest_form.preference_majors.map((major, index) => (
        <div
          className="flex flex-row items-center gap-12"
          key={`${register_contest_form.id} ${index}`}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
            NV{index + 1}
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
            Trường: <span className="font-[400]">{major.school_name}</span>
          </Typography>{" "}
          <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
            Ngành: <span className="font-[400]">{major.majors_name}</span>
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default MajorInfo;
