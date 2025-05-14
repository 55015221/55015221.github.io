import { watch, ref } from "vue";
import { isString } from "@/utils/is";
import { useI18n } from "@/hooks/useI18n";

/**
 * 设置浏览器标题国际化
 * @method const title = useTitle(); ==> title()
 */
export const useTitle = (newTitle?: string) => {
  const { t } = useI18n();
  const appTitle = import.meta.env.VITE_APP_TITLE as string;
  const title = ref(newTitle ? `${appTitle} - ${t(newTitle as string)}` : appTitle);

  watch(
    title,
    (n, o) => {
      if (isString(n) && n !== o && document) {
        document.title = n;
      }
    },
    { immediate: true }
  );

  return title;
};
