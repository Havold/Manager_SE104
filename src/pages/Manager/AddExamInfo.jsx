import { Button, Typography } from "@mui/material";
import MyInput from "components/MyInput";
import MyInputDate from "components/MyInputDate";
import MySelect from "components/MySelect";
import dayjs from "dayjs";
import useAPI from "hooks/useApi";
import React, { useState } from "react";
import { addExamInfo } from "services/manager";
import StudentInfo from "./StudentInfo";

const AddExamInfo = ({ email_list, student_list }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    exam_date: null,
    exam_venue: "",
    exam_room: "",
  });
  const [student_info, setStudentInfo] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };
  const updateExamInfo = useAPI({ queryFn: (payload) => addExamInfo(payload) });
  const handleUpdateExamInfo = () => {
    updateExamInfo
      .run({
        student_email: formValue.email,
        exam_date: formValue.exam_date,
        exam_venue: formValue.exam_venue,
        exam_room: formValue.exam_room,
      })
      .then((res) => {})
      .catch((err) => {});
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center">
        <Typography sx={{ fontSize: 32, fontWeight: 700, color: "#253528" }}>
          Thêm thông tin dự thi cho thí sinh
        </Typography>
        <Button
          onClick={handleUpdateExamInfo}
          sx={{
            color: "#fff",
            marginLeft: "auto",
            background: "#4FE0B5",
            ":hover": { background: "#4FE0B5" },
          }}
        >
          Lưu
        </Button>
      </div>

      <div className="flex flex-row gap-3 items-center  ">
        <MySelect
          optionList={email_list}
          value={formValue.email}
          label="Email"
          name="email"
          onChange={(e) => {
            const value = e.target.value;
            setFormValue((prev) => ({ ...prev, email: value }));

            setStudentInfo(
              student_list[
                student_list.findIndex((student) => student.email === value)
              ]
            );
          }}
        />
        <MyInputDate
          value={dayjs(formValue.exam_date)}
          label="Ngày thi"
          onChange={(value) =>
            setFormValue((prev) => ({ ...prev, exam_date: value }))
          }
        />
        <MyInput
          value={formValue.exam_venue}
          label="Địa điểm thi"
          name="exam_venue"
          onChange={handleChange}
        />
        <MyInput
          value={formValue.exam_room}
          label="Phòng thi"
          name="exam_room"
          onChange={handleChange}
        />
      </div>
      <StudentInfo student_info={student_info} />
    </div>
  );
};

export default AddExamInfo;
