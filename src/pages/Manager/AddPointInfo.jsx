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

const KHTN_list = [
  { title: "Toán", name: "toan" },
  { title: "Văn", name: "van" },
  { title: "Anh", name: "anh" },
  { title: "Lý", name: "ly" },
  { title: "Hóa", name: "hoa" },
  { title: "Sinh", name: "sinh" },
];
const KHXH_list = [
  { title: "Toán", name: "toan" },
  { title: "Văn", name: "van" },
  { title: "Anh", name: "anh" },
  { title: "Sử", name: "su" },
  { title: "Địa", name: "dia" },
  { title: "GDCD", name: "gdcd" },
];

const AddPointInfo = ({ email_list, student_list }) => {
  const saveRequest = useAPI({ queryFn: (payload) => addPointInfo(payload) });
  const [formValue, setFormValue] = useState({
    email: "",
    point_list: [],
    pass_list: [],
  });
  const [student_info, setStudentInfo] = useState(null);
  const handlePointChange = (e) => {
    const { name, value } = e.target;

    if (parseFloat(value) > 10 || parseFloat(value) < 0) return;
    const index = formValue.point_list.findIndex((ele) => ele.name === name);
    setFormValue((prev) => ({
      ...prev,
      point_list: [
        ...prev.point_list.slice(0, index),
        { name, point: value },
        ...prev.point_list.slice(index + 1),
      ],
    }));
  };
  const handlePassListChange = (e) => {
    const { name } = e.target;
    const index = parseInt(name);
    setFormValue((prev) => ({
      ...prev,
      pass_list: prev.pass_list.map((major, i) => ({
        ...major,
        status: i === index ? "T" : i < index ? "X" : "O",
      })),
    }));
  };
  const handleSave = () => {
    saveRequest
      .run({ student_email: formValue.email, ...formValue })
      .then((res) => {
        toast.success("Thêm thành công");
      })
      .catch((err) => {});
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
          const index = student_list.findIndex(
            (student) => student.email === value
          );
          const new_student = student_list[index];
          const point_list = (
            new_student.register_contest_form.exam_type === "KHTN"
              ? KHTN_list
              : KHXH_list
          ).map((ele) => ({ name: ele.name, point: 0 }));
          const pass_list =
            new_student.register_contest_form.preference_majors.map(
              (major) => ({ ...major, status: "" })
            );
          setFormValue((prev) => ({
            ...prev,
            email: value,
            point_list,
            pass_list,
          }));
          setStudentInfo(new_student);
        }}
      />
      {student_info && (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ border: "1px solid #000" }}>
                  <TableCell sx={{ border: "1px solid #000" }}>
                    <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                      Môn thi
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #000" }}>
                    <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                      Điểm thi
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(student_info.register_contest_form.exam_type === "KHTN"
                  ? KHTN_list
                  : KHXH_list
                ).map((point, index) => (
                  <TableRow
                    sx={{ border: "1px solid #000" }}
                    key={`point ${index}`}
                  >
                    <TableCell sx={{ border: "1px solid #000" }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
                        {point.title}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #000" }}>
                      <MyInput
                        onChange={handlePointChange}
                        value={formValue.point_list[index].point}
                        placeholder={`Điểm ${point.title}`}
                        name={point.name}
                      ></MyInput>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>{" "}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ border: "1px solid #000" }}>
                  <TableCell sx={{ border: "1px solid #000" }}>
                    <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                      Ưu tiên
                    </Typography>
                  </TableCell>{" "}
                  <TableCell sx={{ border: "1px solid #000" }}>
                    <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                      Mã trường
                    </Typography>
                  </TableCell>{" "}
                  <TableCell sx={{ border: "1px solid #000" }}>
                    <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                      Mã ngành
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
                {student_info?.register_contest_form?.preference_majors.map(
                  (pass, index) => (
                    <TableRow
                      sx={{ border: "1px solid #000" }}
                      key={`major ${index}`}
                    >
                      <TableCell sx={{ border: "1px solid #000" }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
                          NV{index + 1}
                        </Typography>
                      </TableCell>{" "}
                      <TableCell sx={{ border: "1px solid #000" }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
                          {pass.school_id}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
                          {pass.majors_id}
                        </Typography>
                      </TableCell>{" "}
                      <TableCell sx={{ border: "1px solid #000" }}>
                        <MySelect
                          name={index.toString()}
                          value={formValue.pass_list[index].status}
                          optionList={["T", "X", "O"]}
                          onChange={handlePassListChange}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default AddPointInfo;
