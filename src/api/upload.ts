import request from "@/utils/request";

/**
 * @name 文件上传模块
 *
 * 注意设置请求头
 */

// 图片上传
export const uploadApi = (data: FormData) => {
  return request.post(`/api/upload`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 视频上传
