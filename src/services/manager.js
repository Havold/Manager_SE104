import { axiosForManagerAPI } from "./axios";

export const addExamInfo = async (payload) => {
  return await axiosForManagerAPI
    .request({
      url: "/v1/manager/current/addExamInfo",
      method: "post",
      data: payload,
    })
    .then((res) => res.data);
};
export const addPointInfo = async (payload) => {
  return await axiosForManagerAPI
    .request({
      url: "/v1/manager/current/addPointInfo",
      method: "post",
      data: payload,
    })
    .then((res) => res.data);
};
