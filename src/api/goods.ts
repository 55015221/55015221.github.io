// 图片上传
import request from "./index.ts";

export const fetchData = async (data?: any) => {
  // request.defaults.headers["Content-Type"] = "multipart/form-data;";
  return await request.get(`/api/goods`, data);
};
