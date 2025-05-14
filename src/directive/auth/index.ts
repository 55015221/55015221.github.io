import type { App } from "vue";
import { useUserStore } from "@/store/user";
import pinia from "@/store";
import { judementSameArr } from "@/utils/arrayOperation";

/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="xxx"）
 * @directive 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
 * @directive 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
 */
export default function auth(app: App) {
  const store = useUserStore(pinia);
  // 单个权限验证（v-auth="xxx"）
  app.directive("auth", {
    mounted(el, binding) {
      if (store.userInfo.username !== "Administrator") {
        if (!store.userInfo?.permissions?.some((v: string) => binding.value.includes(v.split(":")[1]))) {
          el.parentNode.removeChild(el);
        }
      }
    },
  });
  // 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
  app.directive("auth-all", {
    mounted(el, binding) {
      const flag = judementSameArr(binding.value, store.userInfo.authBtnList);
      if (!flag) el.parentNode.removeChild(el);
    },
  });
}
