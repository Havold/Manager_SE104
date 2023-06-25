import { Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const StudentInfo = ({ student_info }) => {
  if (!student_info) return <></>;
  return (
    <div className="flex flex-col gap-7 w-full">
      <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
        Thông tin thí sinh
      </Typography>
      <div className="grid grid-cols-3 border-[1px] border-[#D3D3D3] rounded-[12px] w-full py-6 px-6 gap-8">
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Họ và tên: <span className="font-[400]">{student_info.name}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Ngày sinh:{" "}
          <span className="font-[400]">
            {dayjs(student_info.birth).format("DD/MM/YYYY")}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Nơi sinh:{" "}
          <span className="font-[400]">{student_info.place_of_birth}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Số CCCD: <span className="font-[400]">{student_info.CCCD}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Ngày cấp:{" "}
          <span className="font-[400]">
            {dayjs(student_info.CCCD_detail?.date_provide).format("DD/MM/YYYY")}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Nơi cấp:{" "}
          <span className="font-[400]">
            {student_info.CCCD_detail?.provide_by}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Giới tính:{" "}
          <span className="font-[400]">{student_info.sex ? "Nam" : "Nữ"}</span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Điện thoại:{" "}
          <span className="font-[400]">
            {student_info.contact_info?.contact.phone}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Địa chỉ hộ khẩu:{" "}
          <span className="font-[400]">
            {student_info.contact_info?.household.commune} ,{" "}
            {student_info.contact_info?.household.district} ,{" "}
            {student_info.contact_info?.household.province}
          </span>
        </Typography>{" "}
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          Địa chỉ liên lạc:{" "}
          <span className="font-[400]">
            {student_info.contact_info?.contact.commune} ,{" "}
            {student_info.contact_info?.contact.district} ,{" "}
            {student_info.contact_info?.contact.province}
          </span>
        </Typography>{" "}
      </div>
    </div>
  );
};

export default StudentInfo;
