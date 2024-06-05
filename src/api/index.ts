import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { Session } from "@/utils/storage";
import { useUserStore } from "@/store/user";

const baseURL = import.meta.env.VITE_API_URL as string;

// 创建axios实例
const instance: AxiosInstance = axios.create(<AxiosRequestConfig>{
  baseURL: baseURL, // 默认地址请求地址，可在 .env.** 文件中修改
  timeout: 5000, // 设置超时时间
  withCredentials: true, // 是否跨站点访问控制请求(禁用 Cookie 等信息)
  // headers: {
  //   "Content-Type": "application/json;charset=utf-8"
  // }
});

/**
 * 添加请求拦截器
 * 全局拦截请求发送前提交的参数
 * 以下代码为示例，在请求头里带上 token 信息
 */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();
    // 在发送请求之前做些什么 token
    if (userStore.access_token) {
      (<any>config.headers).Authorization = `Bearer ${userStore.access_token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/**
 * 添加响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    // 任何在2xx范围内的状态代码都会触发此功能
    // 处理响应数据
    const userStore = useUserStore();
    // `token` 过期或者账号已在别处登录
    if (response.data.code === 401) {
      userStore.setToken(""); // 清除浏览器全部临时缓存
      ElMessageBox.alert("您的登录状态已失效,请重新登录!", "提示", { type: "warning" }).finally(() => {
        // 去登录页
        window.location.href = "/";
      });
      return Promise.reject(response.data);
    }
    //正常响应
    return Promise.resolve(response.data);
  },
  (error) => {
    //对响应错误做点什么
    if (error.message.includes("timeout") !== -1) {
      ElMessage.error("接口请求超时,请稍后再试!");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误,请检查网络配置!");
    } else {
      ElMessage.error(error.message || error.response.data.message);
    }
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default instance;
