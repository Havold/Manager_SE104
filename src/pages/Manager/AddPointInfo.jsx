import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MyInput from "components/MyInput";
import MySelect from "components/MySelect";
import useAPI from "hooks/useApi";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { addPointInfo } from "services/manager";
import MajorInfo from "./MajorInfo";

const AddPointInfo = ({ email_list, student_list }) => {
  const saveRequest = useAPI({ queryFn: (payload) => addPointInfo(payload) });
  const [formValue, setFormValue] = useState({
    email: "",
    point_list: [],
    pass_list: [],
  });
  const [current_exam, setCurrentExam] = useState({ name: "", point: "" });
  const [current_major, setCurrentMajor] = useState({
    major_name: "",
    major_id: "",
    status: "",
  });
  const [student_info, setStudentInfo] = useState(null);

  const handleSave = () => {
    saveRequest
      .run({ student_email: formValue.email, ...formValue })
      .then((res) => {
        toast.success("Thêm thành công");
      })
      .catch((err) => {});
  };
  const handleCurrentExamChange = (e) => {
    const { name, value } = e.target;
    setCurrentExam((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentMajorChange = (e) => {
    const { name, value } = e.target;
    setCurrentMajor((prev) => ({ ...prev, [name]: value }));
  };
  const addExam = () => {
    setFormValue((prev) => ({
      ...prev,
      point_list: [...formValue.point_list, current_exam],
    }));
  };
  const addMajor = () => {
    setFormValue((prev) => ({
      ...prev,
      pass_list: [...formValue.pass_list, current_major],
    }));
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row items-center">
        <Typography sx={{ fontSize: 32, fontWeight: 700, color: "#253528" }}>
          Thêm thông tin kết quả cho thí sinh
        </Typography>
        <Button
          onClick={handleSave}
          sx={{
            color: "#fff",
            marginLeft: "auto",
            background: "#4FE0B5",
            ":hover": { background: "#4FE0B5" },
          }}
        >
          Lưu
        </Button>
      </div>{" "}
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
              student_list.findIndex((student) => (student.email === value))
            ]
          );
        }}
      />
      {student_info && (
        <MajorInfo register_contest_form={student_info.register_contest_form} />
      )}
      <div className="flex flex-row items-center gap-3">
        <MyInput
          value={current_exam.name}
          label="Môn thi"
          name="name"
          onChange={handleCurrentExamChange}
        />
        <MyInput
          value={current_exam.point}
          label="Điểm"
          name="point"
          onChange={handleCurrentExamChange}
        />
        <Button
          onClick={addExam}
          disabled={!current_exam.name.length || !current_exam.point.length}
          sx={{
            color: "#fff",
            marginTop: "auto",
            background: "#4FE0B5",
            ":hover": { background: "#4FE0B5" },
          }}
        >
          Thêm
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ border: "1px solid #000" }}>
              <TableCell sx={{ border: "1px solid #000" }}>
                <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                  Môn
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid #000" }}>
                <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                  Điểm
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formValue.point_list.map((point, index) => (
              <TableRow
                sx={{ border: "1px solid #000" }}
                key={`point ${index}`}
              >
                <TableCell sx={{ border: "1px solid #000" }}>
                  <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
                    {point.name}
                  </Typography>
                </TableCell>
                <TableCell sx={{ border: "1px solid #000" }}>
                  <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
                    {point.point}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex flex-col gap-3"></div>
      <div className="flex flex-row items-center gap-3">
        <MyInput
          value={current_major.major_name}
          label="Tên nguyện vọng"
          name="major_name"
          onChange={handleCurrentMajorChange}
        />
        <MyInput
          value={current_major.major_id}
          label="Mã nguyện vọng"
          name="major_id"
          onChange={handleCurrentMajorChange}
        />
        <MySelect
          optionList={["T", "O", "X"]}
          value={current_major.status}
          label="Trạng thái"
          name="status"
          onChange={handleCurrentMajorChange}
        />{" "}
        <Button
          onClick={addMajor}
          disabled={
            !current_major.status.length ||
            !current_major.major_id.length ||
            !current_major.major_name.length
          }
          sx={{
            color: "#fff",
            marginTop: "auto",
            background: "#4FE0B5",
            ":hover": { background: "#4FE0B5" },
          }}
        >
          Thêm
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ border: "1px solid #000" }}>
              <TableCell sx={{ border: "1px solid #000" }}>
                <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                  Tên nguyện vọng
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "1px solid #000" }}>
                <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                  Trạng thái
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formValue.pass_list.map((pass, index) => (
              <TableRow
                sx={{ border: "1px solid #000" }}
                key={`major ${index}`}
              >
                <TableCell sx={{ border: "1px solid #000" }}>
                  <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
                    {pass.major_name}
                  </Typography>
                </TableCell>
                <TableCell sx={{ border: "1px solid #000" }}>
                  <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
                    {pass.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AddPointInfo;
