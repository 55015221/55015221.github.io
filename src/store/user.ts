import { defineStore } from "pinia";
import piniaPersistConfig from "@/utils/persist";
import { loginApi, meApi } from "@/api/auth/user";
import { TypeResponse } from "@/types/axios";
import { Session } from "@/utils/storage";

const USER_KEY_ID = "fadm-user";

/**
 * 用户信息
 * @methods setUserInfo 设置用户信息
 */
export const useUserStore = defineStore(USER_KEY_ID, {
  // persist: piniaPersistConfig(USER_KEY_ID, ["access_token", "userInfo"]),
  persist: true,
  state: (): UserState => ({
    token: Session.get("token"),
    userInfo: Session.get("userInfo") || {
      username: "",
      avatar: "https://via.placeholder.com/300x200",
      phone: "",
      email: "",
      remember: 0,
      roles: [],
      permissions: [],
    },
  }),
  getters: {
    // 判断是否登录
    isAuthenticated: (state) => !!Session.get("token"),
  },
  actions: {
    // 登录
    async login(params: any): Promise<void> {
      return new Promise(async (resolve, reject) => {
        try {
          const loginData: TypeResponse = await loginApi(params);
          if (loginData.code !== 200) {
            return reject(new Error(loginData.message));
          }
          this.token = loginData.data.access_token;
          Session.set("token", loginData.data.access_token);
          const userData: TypeResponse = await meApi();
          console.log(userData, 33333);
          if (userData.code !== 200) {
            return reject(new Error(userData.message));
          }
          this.userInfo = userData.data;
          Session.set("userInfo", userData.data);
          return resolve();
        } catch (error: any) {
          return reject(error);
        }
      });
    },
    // 退出
    logout(): void {
      Session.clear();
    },
  },
});
