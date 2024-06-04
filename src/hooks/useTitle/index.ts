import { watch, ref } from "vue";
import { isString } from "@/utils/is";

/**
 * 设置浏览器标题国际化
 * const title = useTitle(); ==> title()
 * @method useTitle()
 */
export const useTitle = (newTitle?: string) => {
	const appTitle = import.meta.env.VITE_APP_TITLE as string;
	const title = ref(newTitle ? `${appTitle} - ${newTitle as string}` : appTitle);

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
