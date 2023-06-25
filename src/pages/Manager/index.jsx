import React from "react";
import AddExamInfo from "./AddExamInfo";
import AddPointInfo from "./AddPointInfo";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import useAPI from "hooks/useApi";
import { getStudentRegister } from "services/auth";

const Manager = () => {
  const studentRegisterRequest = useAPI({
    queryFn: getStudentRegister,
    getNow: true,
  });
  const email_list = studentRegisterRequest?.response?.map(
    (student) => student.email
  );
  const loginStatus = useSelector((state) => state.loginStatus);
  if (loginStatus.isChecking) return <CircularProgress />;
  if (!loginStatus.isLogin) {
    console.log("out e");
    return <Navigate to="/auth/login" />;
  }
  return (
    <div className="flex flex-col p-10 gap-7">
      <AddExamInfo
        email_list={email_list}
        student_list={studentRegisterRequest.response}
      />
      <AddPointInfo
        email_list={email_list}
        student_list={studentRegisterRequest.response}
      />
    </div>
  );
};

export default Manager;
