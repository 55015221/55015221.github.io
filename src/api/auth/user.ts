// 登录
import request from "@/utils/request";

export const loginApi = (data: object): any => {
  return request.post("/api/login", data);
};

export const logoutApi = (): any => {
  return request.post("/api/admin/logout");
};

export const meApi = (): any => {
  return request.get(`/api/admin/me`);
};

/**
 * import api from '@/api'
 *
 * const res = await api.login()
 */
